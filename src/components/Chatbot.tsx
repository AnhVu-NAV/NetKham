import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ShoppingBag, Sparkles } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../data/products';
import { Link } from 'react-router-dom';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Xin chào! ✨ Tôi là chuyên viên tư vấn của Nét Khảm. Tôi có thể giúp bạn tìm hiểu các tác phẩm nghệ thuật khảm xà cừ hoặc hỗ trợ đặt hàng. Bạn đang tìm kiếm món quà nào hôm nay?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Initialize chat session
    const initChat = () => {
      if (!products || products.length === 0) return;
      
      try {
        const productCatalog = products.map(p => `- ${p.name} (ID: ${p.id}) - Giá: ${formatPrice(p.price)} - Danh mục: ${p.category}`).join('\n');
        
        const chat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `Bạn là chuyên viên tư vấn nghệ thuật cao cấp tại Nét Khảm - thương hiệu thủ công mỹ nghệ khảm xà cừ truyền thống.
Dưới đây là bộ sưu tập hiện có:
${productCatalog}

Nhiệm vụ của bạn:
1. Tư vấn tận tình, thanh lịch, mang đậm chất nghệ thuật và văn hóa truyền thống. Sử dụng emoji tinh tế (✨, 🌿, 🌸, 🎁).
2. QUAN TRỌNG NHẤT: Khi giới thiệu BẤT KỲ sản phẩm nào, BẮT BUỘC phải chèn mã sản phẩm theo cú pháp chính xác này: [PRODUCT: ID_SẢN_PHẨM] (ví dụ: [PRODUCT: SP001]). Hệ thống sẽ tự động hiển thị hình ảnh và nút mua hàng cho khách. Đừng quên cú pháp này!
3. Nêu bật giá trị thủ công, chất liệu quý (gỗ trắc, mun, sừng, vỏ ốc biển) và ý nghĩa phong thủy/quà tặng.
4. Nếu khách yêu cầu thêm vào giỏ hàng, hãy gọi hàm \`addToCart\` với \`productId\` tương ứng.
5. Trình bày văn bản rõ ràng, dùng in đậm (**) cho các từ khóa quan trọng hoặc tên sản phẩm.`,
            tools: [{
              functionDeclarations: [{
                name: 'addToCart',
                description: 'Thêm một sản phẩm vào giỏ hàng của khách hàng',
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    productId: {
                      type: Type.STRING,
                      description: 'ID của sản phẩm cần thêm (ví dụ: SP001, SP002)'
                    }
                  },
                  required: ['productId']
                }
              }]
            }]
          }
        });
        setChatSession(chat);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    };
    initChat();
  }, [products]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSession) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI
    const newUserMsg: Message = { id: crypto.randomUUID(), role: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMessage });
      
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'addToCart') {
          const productId = call.args.productId;
          const product = products.find(p => p.id === productId);
          
          if (product) {
            addToCart(product, 1);
            addToast(`Đã thêm ${product.name} vào giỏ hàng`, 'success');
            
            // Send function response back to model
            const followUp = await chatSession.sendMessage({
              message: [{
                functionResponse: {
                  name: 'addToCart',
                  response: { success: true, productName: product.name }
                }
              }]
            });
            
            setMessages(prev => [...prev, {
              id: crypto.randomUUID(),
              role: 'model',
              text: followUp.text || `Tôi đã thêm **${product.name}** vào giỏ hàng cho bạn rồi nhé! ✨`
            }]);
          } else {
            const followUp = await chatSession.sendMessage({
              message: [{
                functionResponse: {
                  name: 'addToCart',
                  response: { success: false, error: 'Không tìm thấy sản phẩm' }
                }
              }]
            });
            
            setMessages(prev => [...prev, {
              id: crypto.randomUUID(),
              role: 'model',
              text: followUp.text || 'Xin lỗi, tôi không tìm thấy sản phẩm này trong hệ thống. 😔'
            }]);
          }
        }
      } else {
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'model',
          text: response.text || 'Xin lỗi, tôi không thể trả lời lúc này.'
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'model',
        text: 'Xin lỗi, đã có lỗi kết nối xảy ra. Vui lòng thử lại sau nhé. 🌿'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom renderer to parse [PRODUCT: ID] into rich UI cards
  const renderContent = (text: string) => {
    const parts = [];
    let lastIndex = 0;
    let match;
    // Regex to match [PRODUCT: SP001] with optional spaces
    const productRegex = /\[PRODUCT:\s*([a-zA-Z0-9]+)\s*\]/g;

    while ((match = productRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'product', id: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    return parts.map((part, index) => {
      if (part.type === 'text') {
        return (
          <div key={index} className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-a:text-gold hover:prose-a:text-gold-light prose-strong:text-gold-light prose-strong:font-semibold prose-ul:pl-4 prose-li:my-0.5">
            <ReactMarkdown>{part.content}</ReactMarkdown>
          </div>
        );
      } else if (part.type === 'product') {
        const product = products.find(p => p.id === part.id);
        if (!product) return null;
        return (
          <div key={index} className="my-4 bg-darker border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-lg group">
            <Link to={`/product/${product.id}`} className="h-40 overflow-hidden relative block">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/40 to-transparent opacity-90"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-ivory font-serif font-medium text-sm line-clamp-2 drop-shadow-md leading-snug">{product.name}</h4>
              </div>
            </Link>
            <div className="p-3 bg-dark/80 flex items-center justify-between gap-2">
              <p className="text-gold text-sm font-semibold">{formatPrice(product.price)}</p>
              <button
                onClick={() => {
                  addToCart(product, 1);
                  addToast(`Đã thêm ${product.name} vào giỏ hàng`, 'success');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 hover:bg-gold text-gold hover:text-darker border border-gold/30 rounded-lg text-xs font-medium transition-all duration-300"
              >
                <ShoppingBag size={14} />
                <span>Thêm</span>
              </button>
            </div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-gold to-gold-light text-darker rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300 z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Mở chat tư vấn"
      >
        <Sparkles size={24} className="absolute top-2 right-2 opacity-50" />
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[360px] sm:w-[400px] h-[550px] max-h-[85vh] bg-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-darker relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-50"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-darker font-serif font-bold shadow-md">
              NK
            </div>
            <div>
              <h3 className="text-ivory font-medium">Nét Khảm AI</h3>
              <p className="text-ivory/60 text-xs flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Trực tuyến
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-ivory/60 hover:text-ivory p-1.5 hover:bg-white/5 rounded-lg transition-colors relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-gold to-gold-light text-darker rounded-tr-sm' 
                    : 'bg-darker/90 backdrop-blur-sm border border-white/10 text-ivory rounded-tl-sm'
                }`}
              >
                {msg.role === 'model' ? (
                  renderContent(msg.text)
                ) : (
                  <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-darker/90 backdrop-blur-sm border border-white/10 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-darker">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 bg-dark border border-white/10 rounded-full px-4 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light text-darker flex items-center justify-center shrink-0 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
