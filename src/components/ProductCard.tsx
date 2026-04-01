import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart, Scale } from 'lucide-react';
import { Product, formatPrice } from '../data/products';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  key?: string | number;
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const isCompared = isInCompare(product.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    addToast('Đã thêm vào giỏ hàng', 'success');
  };

  return (
    <div className="group relative bg-darker/50 border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-gold text-darker text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
            Mới
          </span>
        )}
        {product.originalPrice && (
          <span className="bg-red-900/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-dark">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Secondary Image on Hover */}
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          )}
        </Link>
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex justify-center gap-2 bg-gradient-to-t from-darker/90 to-transparent">
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-darker/80 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-darker transition-colors" 
            title="Thêm vào giỏ"
          >
            <ShoppingBag size={18} />
          </button>
          <button 
            onClick={handleCompare}
            className={`w-10 h-10 rounded-full bg-darker/80 border ${isCompared ? 'border-gold text-gold' : 'border-gold/50 text-gold'} flex items-center justify-center hover:bg-gold hover:text-darker transition-colors`} 
            title={isCompared ? "Bỏ so sánh" : "So sánh"}
          >
            <Scale size={18} />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-darker/80 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-darker transition-colors" 
            title="Xem chi tiết"
          >
            <Eye size={18} />
          </Link>
          <button 
            onClick={(e) => { e.preventDefault(); addToast('Đã thêm vào danh sách yêu thích', 'success'); }}
            className="w-10 h-10 rounded-full bg-darker/80 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-darker transition-colors" 
            title="Yêu thích"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <p className="text-gold/70 text-xs uppercase tracking-widest mb-2">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-ivory font-serif text-lg mb-3 line-clamp-2 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-center items-center gap-3">
          <span className="text-gold font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-ivory/40 text-sm line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
