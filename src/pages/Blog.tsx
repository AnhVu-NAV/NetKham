import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Bí Quyết Bảo Quản Trang Sức Khảm Xà Cừ Luôn Sáng Bóng',
    excerpt: 'Khảm xà cừ là nghệ thuật tinh tế đòi hỏi sự chăm sóc đặc biệt. Hãy cùng Nét Khảm tìm hiểu cách giữ cho món trang sức của bạn luôn như mới qua thời gian.',
    image: 'https://images.unsplash.com/photo-1599643478524-fb5244098775?auto=format&fit=crop&q=80&w=800',
    date: '15/05/2026',
    author: 'Nghệ nhân Nét Khảm',
    category: 'Bảo quản'
  },
  {
    id: 2,
    title: 'Ý Nghĩa Phong Thủy Của Họa Tiết Rồng Phượng Trong Đồ Khảm',
    excerpt: 'Rồng và Phượng không chỉ là biểu tượng của quyền lực và sự quý phái mà còn mang ý nghĩa phong thủy sâu sắc, mang lại may mắn và thịnh vượng cho gia chủ.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800',
    date: '02/05/2026',
    author: 'Nét Khảm',
    category: 'Văn hóa'
  },
  {
    id: 3,
    title: 'Gợi Ý Quà Tặng Ý Nghĩa Cho Ngày Của Mẹ Từ Nét Khảm',
    excerpt: 'Những chiếc trâm cài, chiếc lược sừng khảm xà cừ không chỉ là món đồ trang sức mà còn là món quà chứa đựng tình cảm sâu sắc dành tặng đấng sinh thành.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    date: '20/04/2026',
    author: 'Nét Khảm',
    category: 'Quà tặng'
  },
  {
    id: 4,
    title: 'Hành Trình Chế Tác: Từ Vỏ Trai Vô Tri Đến Kiệt Tác Nghệ Thuật',
    excerpt: 'Khám phá quy trình chế tác thủ công đầy gian nan nhưng cũng đầy tự hào của các nghệ nhân Nét Khảm để tạo ra một sản phẩm hoàn chỉnh.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800',
    date: '10/04/2026',
    author: 'Nghệ nhân Nét Khảm',
    category: 'Chế tác'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-dark py-16 mb-16 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Tin Tức & Cẩm Nang</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Khám phá những câu chuyện văn hóa, bí quyết bảo quản và kiến thức chuyên sâu về nghệ thuật khảm xà cừ truyền thống.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Post (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden rounded-lg mb-6 bg-dark">
              <img 
                src={posts[0].image} 
                alt={posts[0].title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 bg-gold text-darker text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm z-10">
                {posts[0].category}
              </div>
            </div>
            <div className="flex items-center gap-4 text-ivory/50 text-sm mb-3">
              <span className="flex items-center gap-1"><Calendar size={14} /> {posts[0].date}</span>
              <span className="flex items-center gap-1"><User size={14} /> {posts[0].author}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-ivory mb-4 group-hover:text-gold transition-colors">
              {posts[0].title}
            </h2>
            <p className="text-ivory/70 leading-relaxed mb-4 max-w-3xl">
              {posts[0].excerpt}
            </p>
            <span className="inline-flex items-center gap-2 text-gold hover:text-gold-light uppercase tracking-widest text-sm font-medium transition-colors">
              Đọc tiếp <ArrowRight size={16} />
            </span>
          </div>

          {/* Other Posts */}
          {posts.slice(1).map((post) => (
            <div key={post.id} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-dark">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-darker/80 border border-gold/50 text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm z-10 backdrop-blur-sm">
                  {post.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-ivory/50 text-sm mb-3">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              </div>
              <h3 className="text-xl font-serif text-ivory mb-3 group-hover:text-gold transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-ivory/70 leading-relaxed mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-gold hover:text-gold-light uppercase tracking-widest text-sm font-medium transition-colors mt-auto">
                Đọc tiếp <ArrowRight size={16} />
              </span>
            </div>
          ))}
        </div>

        {/* Pagination (Mock) */}
        <div className="flex justify-center mt-16 gap-2">
          <button className="w-10 h-10 rounded border border-gold bg-gold text-darker font-medium flex items-center justify-center">1</button>
          <button className="w-10 h-10 rounded border border-white/20 text-ivory hover:border-gold hover:text-gold transition-colors flex items-center justify-center">2</button>
          <button className="w-10 h-10 rounded border border-white/20 text-ivory hover:border-gold hover:text-gold transition-colors flex items-center justify-center">3</button>
          <button className="w-10 h-10 rounded border border-white/20 text-ivory hover:border-gold hover:text-gold transition-colors flex items-center justify-center"><ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
