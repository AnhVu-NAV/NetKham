import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export default function Home() {
  const { products, isLoading } = useProducts();
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=2000" 
            alt="Khảm xà cừ nghệ thuật" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darker/60 via-darker/40 to-darker"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold tracking-[0.3em] uppercase text-sm md:text-base mb-6"
          >
            Tinh Hoa Nghệ Thuật Truyền Thống
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-ivory mb-8 leading-tight"
          >
            Vẻ Đẹp Vượt <br/><span className="italic text-gold">Thời Gian</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-ivory/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Khám phá bộ sưu tập trang sức và phụ kiện khảm xà cừ thủ công cao cấp, nơi mỗi sản phẩm là một tác phẩm nghệ thuật độc bản.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/products" className="px-10 py-4 bg-gold text-darker font-medium tracking-wider uppercase hover:bg-gold-light transition-colors w-full sm:w-auto text-center">
              Mua Ngay
            </Link>
            <Link to="/collections" className="px-10 py-4 border border-gold text-gold font-medium tracking-wider uppercase hover:bg-gold/10 transition-colors w-full sm:w-auto text-center">
              Xem Bộ Sưu Tập
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-ivory/50 text-xs uppercase tracking-widest">Cuộn xuống</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-darker">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-4">Danh Mục Sản Phẩm</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <Link to="/products?category=trâm-gương-lược" className="group relative aspect-[3/4] overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1599643478524-fb5244098775?auto=format&fit=crop&q=80&w=800" alt="Trâm Gương Lược" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <h3 className="text-2xl font-serif text-ivory mb-2">Trâm Gương Lược</h3>
                <span className="text-gold text-sm uppercase tracking-widest opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 inline-block">Khám phá</span>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link to="/products?category=trang-sức" className="group relative aspect-[3/4] overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800" alt="Trang Sức" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <h3 className="text-2xl font-serif text-ivory mb-2">Trang Sức</h3>
                <span className="text-gold text-sm uppercase tracking-widest opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 inline-block">Khám phá</span>
              </div>
            </Link>

            {/* Category 3 */}
            <Link to="/products?category=phụ-kiện" className="group relative aspect-[3/4] overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800" alt="Phụ Kiện" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <h3 className="text-2xl font-serif text-ivory mb-2">Phụ Kiện</h3>
                <span className="text-gold text-sm uppercase tracking-widest opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 inline-block">Khám phá</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-4">Sản Phẩm Nổi Bật</h2>
              <div className="w-16 h-[1px] bg-gold"></div>
            </div>
            <Link to="/products" className="text-gold hover:text-ivory uppercase tracking-widest text-sm transition-colors flex items-center gap-2">
              Xem tất cả
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-12 text-ivory/60">Đang tải sản phẩm...</div>
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-darker relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000" alt="Nghệ nhân khảm xà cừ" className="w-full h-full object-cover opacity-80" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-gold/30 rounded-full hidden md:block"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 border border-gold/30 rounded-full hidden md:block"></div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <p className="text-gold tracking-[0.2em] uppercase text-sm mb-4">Câu Chuyện Thương Hiệu</p>
              <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-8 leading-tight">
                Lưu Giữ Tinh Hoa <br/><span className="italic text-gold">Nghệ Thuật Việt</span>
              </h2>
              <div className="space-y-6 text-ivory/70 font-light leading-relaxed mb-10">
                <p>
                  "Nét Khảm" ra đời từ tình yêu mãnh liệt với nghệ thuật khảm xà cừ truyền thống. Chúng tôi tin rằng mỗi mảnh vỏ trai, vỏ ốc đều mang trong mình một câu chuyện của biển cả, và qua bàn tay tài hoa của nghệ nhân, chúng hóa thành những tác phẩm nghệ thuật bất hủ.
                </p>
                <p>
                  Từng sản phẩm của Nét Khảm đều trải qua hàng chục công đoạn tỉ mỉ, từ chọn lựa nguyên liệu, cưa cắt, đục gỗ, đến khảm, mài và đánh bóng. Tất cả nhằm mang đến những món trang sức, phụ kiện không chỉ đẹp mắt mà còn chứa đựng giá trị văn hóa sâu sắc.
                </p>
              </div>
              <Link to="/about" className="inline-flex items-center gap-3 text-gold hover:text-ivory uppercase tracking-widest text-sm transition-colors group">
                <span className="border-b border-gold group-hover:border-ivory pb-1 transition-colors">Đọc Thêm Về Chúng Tôi</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
