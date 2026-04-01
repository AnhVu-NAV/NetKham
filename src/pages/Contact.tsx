import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!', 'success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-16 mb-16 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Liên Hệ</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với Nét Khảm qua các kênh dưới đây.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-serif text-ivory mb-8">Thông Tin</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center text-gold shrink-0 border border-white/5">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-ivory font-medium mb-2 uppercase tracking-wider text-sm">Địa Chỉ Cửa Hàng</h3>
                  <p className="text-ivory/60 leading-relaxed">
                    123 Đường Nghệ Nhân, Phường Hàng Bạc,<br />
                    Quận Hoàn Kiếm, Hà Nội
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center text-gold shrink-0 border border-white/5">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-ivory font-medium mb-2 uppercase tracking-wider text-sm">Điện Thoại</h3>
                  <p className="text-ivory/60">090 123 4567</p>
                  <p className="text-ivory/60">024 3825 6789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center text-gold shrink-0 border border-white/5">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-ivory font-medium mb-2 uppercase tracking-wider text-sm">Email</h3>
                  <p className="text-ivory/60">contact@netkham.vn</p>
                  <p className="text-ivory/60">support@netkham.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center text-gold shrink-0 border border-white/5">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-ivory font-medium mb-2 uppercase tracking-wider text-sm">Giờ Mở Cửa</h3>
                  <p className="text-ivory/60">Thứ 2 - Thứ 6: 9:00 - 21:00</p>
                  <p className="text-ivory/60">Thứ 7 - CN: 9:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-dark p-8 md:p-12 rounded-lg border border-white/5">
              <h2 className="text-3xl font-serif text-ivory mb-8">Gửi Tin Nhắn</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-ivory/70 text-sm mb-2">Họ & Tên *</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-ivory/70 text-sm mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-ivory/70 text-sm mb-2">Số Điện Thoại</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-ivory/70 text-sm mb-2">Nội Dung Tin Nhắn *</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors resize-none"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-10 py-4 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors rounded"
                >
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 h-[400px] bg-dark rounded-lg border border-white/5 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 grayscale"></div>
          <div className="absolute inset-0 bg-darker/60"></div>
          <div className="relative z-10 text-center">
            <MapPin size={48} className="text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-ivory mb-2">Nét Khảm Store</h3>
            <p className="text-ivory/60">123 Đường Nghệ Nhân, Hoàn Kiếm, Hà Nội</p>
          </div>
        </div>
      </div>
    </div>
  );
}
