import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Cart() {
  const { cartItems: items, removeFromCart, updateQuantity, clearCart, cartTotal, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const { addToast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const shipping = items.length > 0 ? 30000 : 0;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount.includes('%')) {
      const percentage = parseInt(appliedCoupon.discount.replace('%', ''));
      discountAmount = cartTotal * (percentage / 100);
    } else if (appliedCoupon.discount.toLowerCase().includes('miễn phí vận chuyển') || appliedCoupon.discount.toLowerCase().includes('freeship')) {
      discountAmount = shipping;
    } else {
      // Assume fixed amount if it's just a number
      const fixedAmount = parseInt(appliedCoupon.discount.replace(/\D/g, ''));
      if (!isNaN(fixedAmount)) {
        discountAmount = fixedAmount;
      }
    }
  }

  const total = Math.max(0, cartTotal + shipping - discountAmount);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      addToast('Vui lòng nhập mã giảm giá', 'error');
      return;
    }

    setIsApplying(true);
    try {
      const response = await fetch(`/api/coupons/code/${promoCode.trim()}`);
      if (response.ok) {
        const coupon = await response.json();
        if (coupon.status === 'Hoạt động') {
          const expiryDate = new Date(coupon.expiry);
          if (expiryDate >= new Date()) {
            applyCoupon({ code: coupon.code, discount: coupon.discount });
            addToast('Áp dụng mã giảm giá thành công', 'success');
            setPromoCode('');
          } else {
            addToast('Mã giảm giá đã hết hạn', 'error');
          }
        } else {
          addToast('Mã giảm giá không còn hoạt động', 'error');
        }
      } else {
        addToast('Mã giảm giá không hợp lệ', 'error');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      addToast('Có lỗi xảy ra khi áp dụng mã giảm giá', 'error');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="bg-dark py-12 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Giỏ Hàng Của Bạn</h1>
          <p className="text-ivory/60">
            {items.length} sản phẩm trong giỏ hàng
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-dark rounded-lg border border-white/5 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-darker rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <ShoppingBag size={32} className="text-gold" />
            </div>
            <p className="text-ivory/60 text-lg mb-6">Giỏ hàng của bạn đang trống.</p>
            <Link to="/products" className="inline-block px-8 py-3 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors rounded">
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-ivory/50 text-sm uppercase tracking-wider mb-6">
                <div className="col-span-6">Sản Phẩm</div>
                <div className="col-span-2 text-center">Giá</div>
                <div className="col-span-2 text-center">Số Lượng</div>
                <div className="col-span-2 text-right">Tổng</div>
              </div>

              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pb-6 border-b border-white/5">
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="w-24 h-24 bg-dark rounded overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-gold text-xs uppercase tracking-widest mb-1">{item.category}</p>
                        <Link to={`/product/${item.id}`} className="text-ivory font-serif text-lg hover:text-gold transition-colors line-clamp-2 mb-2">
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400/70 hover:text-red-400 text-sm flex items-center gap-1 w-fit transition-colors"
                        >
                          <Trash2 size={14} /> Xóa
                        </button>
                      </div>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center text-ivory/80">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-ivory/50 text-sm">Số lượng:</span>
                      <div className="flex items-center border border-white/20 rounded h-10 w-28 bg-dark">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity}
                          readOnly
                          className="flex-1 h-full bg-transparent text-center text-ivory text-sm font-medium focus:outline-none"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                      <span className="md:hidden text-ivory/50 text-sm">Tổng cộng:</span>
                      <span className="text-gold font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 flex justify-between items-center">
                <button 
                  onClick={clearCart}
                  className="text-ivory/60 hover:text-ivory text-sm underline underline-offset-4"
                >
                  Xóa toàn bộ giỏ hàng
                </button>
                <Link to="/products" className="text-gold hover:text-gold-light text-sm font-medium">
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-dark p-8 rounded-lg border border-white/5 sticky top-28">
                <h2 className="text-2xl font-serif text-ivory mb-6 pb-4 border-b border-white/10">Tổng Đơn Hàng</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-ivory/70">
                    <span>Tạm tính</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-ivory/70">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-gold">
                      <span>Giảm giá ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <label htmlFor="promo" className="block text-ivory/50 text-sm mb-2">Mã giảm giá</label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-gold/10 border border-gold/20 rounded px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gold font-medium">{appliedCoupon.code}</span>
                        <span className="text-ivory/60 text-sm">({appliedCoupon.discount})</span>
                      </div>
                      <button 
                        onClick={removeCoupon}
                        className="text-ivory/60 hover:text-red-400 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        id="promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Nhập mã..." 
                        className="flex-1 bg-darker border border-white/20 rounded px-4 py-2 text-ivory focus:outline-none focus:border-gold transition-colors"
                      />
                      <button 
                        onClick={handleApplyPromo}
                        disabled={isApplying}
                        className="px-4 py-2 bg-white/10 text-ivory rounded hover:bg-gold hover:text-darker transition-colors uppercase text-sm tracking-wider font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isApplying ? 'Đang áp dụng...' : 'Áp dụng'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-ivory font-medium text-lg">Tổng cộng</span>
                  <span className="text-3xl font-serif text-gold">{formatPrice(total)}</span>
                </div>

                <Link to="/checkout" className="w-full py-4 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2 rounded">
                  Tiến Hành Thanh Toán <ArrowRight size={18} />
                </Link>
                
                <div className="mt-6 text-center text-ivory/40 text-xs flex flex-col gap-2">
                  <p>Thanh toán an toàn & bảo mật</p>
                  <div className="flex justify-center gap-2">
                    {/* Payment icons placeholders */}
                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
