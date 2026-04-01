import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Compare() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    addToast(`Đã thêm ${product.name} vào giỏ hàng`, 'success');
  };

  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-12 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">So Sánh Sản Phẩm</h1>
          <p className="text-ivory/60">
            {compareItems.length} sản phẩm đang được so sánh
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors mb-8 text-sm uppercase tracking-wider">
          <ArrowLeft size={16} /> Tiếp tục mua sắm
        </Link>

        {compareItems.length === 0 ? (
          <div className="text-center py-20 bg-dark rounded-lg border border-white/5">
            <p className="text-ivory/60 text-lg mb-6">Chưa có sản phẩm nào trong danh sách so sánh.</p>
            <Link to="/products" className="inline-block px-8 py-3 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors rounded">
              Thêm Sản Phẩm
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto pb-8 hide-scrollbar">
            <div className="min-w-[800px]">
              <div className="flex justify-end mb-4">
                <button 
                  onClick={clearCompare}
                  className="text-red-400/70 hover:text-red-400 text-sm flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={16} /> Xóa tất cả
                </button>
              </div>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  {/* Basic Info Row */}
                  <tr>
                    <th className="w-48 p-4 border border-white/10 bg-dark text-ivory/60 font-medium align-top">Sản phẩm</th>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 border border-white/10 bg-darker w-64 align-top relative">
                        <button 
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute top-6 right-6 w-8 h-8 bg-darker/80 border border-white/10 rounded-full flex items-center justify-center text-ivory/60 hover:text-red-400 hover:border-red-400 transition-colors z-10"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="aspect-square bg-dark rounded overflow-hidden mb-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <Link to={`/product/${item.id}`} className="text-lg font-serif text-ivory hover:text-gold transition-colors line-clamp-2 mb-2">
                          {item.name}
                        </Link>
                        <div className="text-gold font-medium text-lg mb-4">{formatPrice(item.price)}</div>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="w-full py-2 bg-gold text-darker font-medium uppercase tracking-wider text-sm hover:bg-gold-light transition-colors flex items-center justify-center gap-2 rounded"
                        >
                          <ShoppingBag size={16} /> Thêm Vào Giỏ
                        </button>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Category Row */}
                  <tr>
                    <th className="p-4 border border-white/10 bg-dark text-ivory/60 font-medium">Danh mục</th>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 border border-white/10 bg-darker text-ivory/80">
                        {item.category}
                      </td>
                    ))}
                  </tr>

                  {/* Material Row */}
                  <tr>
                    <th className="p-4 border border-white/10 bg-dark text-ivory/60 font-medium">Chất liệu</th>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 border border-white/10 bg-darker text-ivory/80">
                        {item.material}
                      </td>
                    ))}
                  </tr>

                  {/* Description Row */}
                  <tr>
                    <th className="p-4 border border-white/10 bg-dark text-ivory/60 font-medium align-top">Mô tả</th>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 border border-white/10 bg-darker text-ivory/70 text-sm leading-relaxed align-top">
                        {item.description}
                      </td>
                    ))}
                  </tr>

                  {/* Badges Row */}
                  <tr>
                    <th className="p-4 border border-white/10 bg-dark text-ivory/60 font-medium">Đặc điểm</th>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 border border-white/10 bg-darker">
                        <div className="flex flex-wrap gap-2">
                          {item.isNew && <span className="flex items-center gap-1 text-emerald-400 text-xs uppercase tracking-wider"><Check size={14} /> Mới</span>}
                          {item.isBestSeller && <span className="flex items-center gap-1 text-gold text-xs uppercase tracking-wider"><Check size={14} /> Bán chạy</span>}
                          {!item.isNew && !item.isBestSeller && <span className="text-ivory/40 text-xs">-</span>}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
