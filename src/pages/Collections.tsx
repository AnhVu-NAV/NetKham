import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 'hoang-cung',
    title: 'Bộ Sưu Tập Hoàng Cung',
    subtitle: 'Quyền Quý & Đẳng Cấp',
    description: 'Lấy cảm hứng từ vẻ đẹp quyền quý của chốn cung đình xưa, bộ sưu tập mang đến những thiết kế trâm, lược khảm rồng phượng tinh xảo. Sự kết hợp hoàn hảo giữa chất liệu sừng trâu đen nhánh, gỗ quý và ánh xà cừ rực rỡ.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1600',
    align: 'left'
  },
  {
    id: 'nang-tho',
    title: 'Bộ Sưu Tập Nàng Thơ',
    subtitle: 'Thanh Lịch & Dịu Dàng',
    description: 'Dành riêng cho những tâm hồn lãng mạn, bộ sưu tập Nàng Thơ tập trung vào các họa tiết hoa lá, chim muông mềm mại. Ánh xà cừ trắng ngà và hồng nhạt tôn lên vẻ đẹp thanh tao, nữ tính của người sở hữu.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1600',
    align: 'right'
  },
  {
    id: 'tu-quy',
    title: 'Bộ Sưu Tập Tứ Quý',
    subtitle: 'Tùng - Cúc - Trúc - Mai',
    description: 'Tái hiện bức tranh tứ quý kinh điển của văn hóa Á Đông qua nghệ thuật khảm xà cừ. Bốn mùa luân chuyển được khắc họa sinh động trên các vật phẩm phong thủy và hộp đựng trang sức cao cấp.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=1600',
    align: 'left'
  }
];

export default function Collections() {
  return (
    <div className="min-h-screen bg-darker pt-24 pb-0">
      {/* Page Header */}
      <div className="bg-dark py-16 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Các Bộ Sưu Tập</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Mỗi bộ sưu tập là một câu chuyện nghệ thuật riêng biệt, được các nghệ nhân Nét Khảm dồn tâm huyết chế tác.
          </p>
        </div>
      </div>

      {/* Collections List */}
      <div className="flex flex-col">
        {collections.map((collection, index) => (
          <div key={collection.id} className={`flex flex-col ${collection.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[70vh]`}>
            {/* Image Half */}
            <div className="lg:w-1/2 relative h-[50vh] lg:h-auto">
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darker/80 via-transparent to-transparent lg:hidden"></div>
            </div>
            
            {/* Content Half */}
            <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-darker relative">
              <div className="max-w-xl">
                <span className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4 block">
                  {collection.subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-6 leading-tight">
                  {collection.title}
                </h2>
                <p className="text-ivory/70 leading-relaxed text-lg mb-10">
                  {collection.description}
                </p>
                <Link 
                  to={`/products?collection=${collection.id}`} 
                  className="inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-darker transition-all uppercase tracking-widest text-sm font-medium"
                >
                  Khám Phá Ngay <ArrowRight size={18} />
                </Link>
              </div>
              
              {/* Decorative Number */}
              <div className="absolute top-8 right-8 text-[120px] font-serif font-bold text-white/[0.02] leading-none select-none pointer-events-none">
                0{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
