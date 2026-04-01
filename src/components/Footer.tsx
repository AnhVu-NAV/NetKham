import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-darker pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="text-3xl font-serif font-bold tracking-wider text-ivory flex items-center">
                <span className="text-gold mr-1">Nét</span> Khảm
              </div>
            </Link>
            <p className="text-ivory/60 text-sm leading-relaxed mb-6">
              Tinh hoa nghệ thuật khảm xà cừ truyền thống Việt Nam, được chế tác thủ công bởi những nghệ nhân lành nghề, mang đến vẻ đẹp sang trọng và đẳng cấp.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-gold hover:text-darker hover:border-gold transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-gold hover:text-darker hover:border-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-gold hover:text-darker hover:border-gold transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><polyline points="10 15 15 12 10 9 10 15"></polyline></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif text-ivory mb-6">Liên Kết Nhanh</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-ivory/60 hover:text-gold text-sm transition-colors">Về Nét Khảm</Link></li>
              <li><Link to="/products" className="text-ivory/60 hover:text-gold text-sm transition-colors">Sản Phẩm</Link></li>
              <li><Link to="/collections" className="text-ivory/60 hover:text-gold text-sm transition-colors">Bộ Sưu Tập</Link></li>
              <li><Link to="/blog" className="text-ivory/60 hover:text-gold text-sm transition-colors">Tin Tức & Blog</Link></li>
              <li><Link to="/contact" className="text-ivory/60 hover:text-gold text-sm transition-colors">Liên Hệ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-serif text-ivory mb-6">Chăm Sóc Khách Hàng</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-ivory/60 hover:text-gold text-sm transition-colors">Câu Hỏi Thường Gặp</Link></li>
              <li><Link to="/shipping" className="text-ivory/60 hover:text-gold text-sm transition-colors">Chính Sách Giao Hàng</Link></li>
              <li><Link to="/returns" className="text-ivory/60 hover:text-gold text-sm transition-colors">Chính Sách Đổi Trả</Link></li>
              <li><Link to="/privacy" className="text-ivory/60 hover:text-gold text-sm transition-colors">Bảo Mật Thông Tin</Link></li>
              <li><Link to="/terms" className="text-ivory/60 hover:text-gold text-sm transition-colors">Điều Khoản Sử Dụng</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif text-ivory mb-6">Thông Tin Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-ivory/60 text-sm">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span>123 Đường Nghệ Nhân, Phường Hàng Bạc, Quận Hoàn Kiếm, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 text-ivory/60 text-sm">
                <Phone size={18} className="text-gold shrink-0" />
                <span>090 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-ivory/60 text-sm">
                <Mail size={18} className="text-gold shrink-0" />
                <span>contact@netkham.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ivory/40 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Nét Khảm. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Payment icons placeholders */}
            <div className="w-10 h-6 bg-white/10 rounded"></div>
            <div className="w-10 h-6 bg-white/10 rounded"></div>
            <div className="w-10 h-6 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
