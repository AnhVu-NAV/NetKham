import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Sản phẩm của Nét Khảm được làm từ chất liệu gì?',
    answer: 'Tất cả sản phẩm của chúng tôi đều được chế tác từ các chất liệu tự nhiên cao cấp như gỗ quý (gỗ trắc, gỗ mun), sừng trâu, và đặc biệt là vỏ trai, vỏ ốc biển tự nhiên được tuyển chọn kỹ lưỡng.'
  },
  {
    question: 'Thời gian giao hàng là bao lâu?',
    answer: 'Đối với các sản phẩm có sẵn, thời gian giao hàng từ 2-4 ngày làm việc. Đối với các sản phẩm đặt làm theo yêu cầu, thời gian hoàn thiện và giao hàng có thể từ 10-15 ngày tùy thuộc vào độ phức tạp của sản phẩm.'
  },
  {
    question: 'Tôi có thể đặt làm sản phẩm theo yêu cầu không?',
    answer: 'Có, Nét Khảm nhận chế tác các sản phẩm theo yêu cầu riêng của khách hàng. Bạn có thể liên hệ trực tiếp với chúng tôi qua hotline hoặc email để trao đổi chi tiết về ý tưởng và nhận báo giá.'
  },
  {
    question: 'Chính sách bảo hành của Nét Khảm như thế nào?',
    answer: 'Chúng tôi bảo hành 12 tháng cho tất cả các lỗi kỹ thuật từ nhà sản xuất (như bong tróc xà cừ, nứt vỡ do lỗi chế tác). Không bảo hành cho các trường hợp hư hỏng do va đập mạnh, rơi vỡ hoặc sử dụng hóa chất tẩy rửa mạnh.'
  },
  {
    question: 'Làm thế nào để bảo quản sản phẩm khảm xà cừ?',
    answer: 'Để sản phẩm luôn bền đẹp, bạn nên tránh để sản phẩm tiếp xúc trực tiếp với ánh nắng mặt trời gắt, nhiệt độ cao hoặc hóa chất. Lau chùi nhẹ nhàng bằng khăn mềm, khô. Tránh va đập mạnh hoặc làm rơi sản phẩm.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-16 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Câu Hỏi Thường Gặp</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Giải đáp những thắc mắc phổ biến về sản phẩm và dịch vụ của Nét Khảm.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-dark border border-white/5 rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-serif text-ivory pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`text-gold transition-transform duration-300 shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-ivory/70 leading-relaxed pt-2 border-t border-white/5">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-dark p-8 rounded-lg border border-white/5">
          <h3 className="text-xl font-serif text-ivory mb-4">Bạn vẫn còn câu hỏi?</h3>
          <p className="text-ivory/60 mb-6">Hãy liên hệ trực tiếp với chúng tôi để được hỗ trợ tốt nhất.</p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors rounded"
          >
            Liên hệ ngay
          </a>
        </div>
      </div>
    </div>
  );
}
