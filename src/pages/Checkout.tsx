import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSuccess, setIsSuccess] = useState(false);
  const { cartItems: items, cartTotal, clearCart, appliedCoupon } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      addToast('Giỏ hàng của bạn đang trống', 'info');
      navigate('/cart');
    }
  }, [items, isSuccess, navigate, addToast]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      const orderData = {
        id: `ORD-${Date.now()}`,
        customer: formData.get('fullname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        date: new Date().toLocaleDateString('vi-VN'),
        total: total,
        status: 'Đang xử lý',
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      setIsSuccess(true);
      clearCart();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting order:', error);
      addToast('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.', 'error');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-darker pt-32 pb-20 flex items-center justify-center">
        <div className="bg-dark p-12 rounded-lg border border-white/5 text-center max-w-lg mx-auto shadow-[0_0_40px_rgba(212,175,55,0.05)]">
          <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-ivory mb-4">Đặt Hàng Thành Công!</h1>
          <p className="text-ivory/70 mb-8 leading-relaxed">
            Cảm ơn bạn đã mua sắm tại Nét Khảm. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn. Mã đơn hàng của bạn là <strong className="text-gold">#NK{Math.floor(Math.random() * 100000)}</strong>.
          </p>
          <p className="text-ivory/50 text-sm mb-8">
            Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn.
          </p>
          <Link to="/products" className="inline-block px-8 py-4 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors rounded">
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Link to="/cart" className="inline-flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors mb-8 text-sm uppercase tracking-wider">
          <ArrowLeft size={16} /> Quay lại giỏ hàng
        </Link>
        
        <h1 className="text-4xl font-serif text-ivory mb-12">Thanh Toán</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
              {/* Shipping Info */}
              <div className="bg-dark p-8 rounded-lg border border-white/5">
                <h2 className="text-2xl font-serif text-ivory mb-6 pb-4 border-b border-white/10">Thông Tin Giao Hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="fullname" className="block text-ivory/70 text-sm mb-2">Họ và tên *</label>
                    <input type="text" id="fullname" name="fullname" defaultValue={user?.name || ''} required className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-ivory/70 text-sm mb-2">Số điện thoại *</label>
                    <input type="tel" id="phone" name="phone" defaultValue={user?.phone || ''} required className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-ivory/70 text-sm mb-2">Email *</label>
                    <input type="email" id="email" name="email" defaultValue={user?.email || ''} required className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-ivory/70 text-sm mb-2">Địa chỉ giao hàng chi tiết *</label>
                    <input type="text" id="address" name="address" required className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="note" className="block text-ivory/70 text-sm mb-2">Ghi chú đơn hàng (Tùy chọn)</label>
                    <textarea id="note" name="note" rows={3} className="w-full bg-darker border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors resize-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-dark p-8 rounded-lg border border-white/5">
                <h2 className="text-2xl font-serif text-ivory mb-6 pb-4 border-b border-white/10">Phương Thức Thanh Toán</h2>
                <div className="space-y-4">
                  {/* COD */}
                  <label className={`flex items-start gap-4 p-4 rounded border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center h-6">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 accent-gold bg-darker border-white/20"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Truck size={20} className={paymentMethod === 'cod' ? 'text-gold' : 'text-ivory/60'} />
                        <span className={`font-medium ${paymentMethod === 'cod' ? 'text-gold' : 'text-ivory'}`}>Thanh toán khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-ivory/50 text-sm">Thanh toán bằng tiền mặt khi đơn hàng được giao đến địa chỉ của bạn.</p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label className={`flex items-start gap-4 p-4 rounded border cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center h-6">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="bank" 
                        checked={paymentMethod === 'bank'} 
                        onChange={() => setPaymentMethod('bank')}
                        className="w-4 h-4 accent-gold bg-darker border-white/20"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard size={20} className={paymentMethod === 'bank' ? 'text-gold' : 'text-ivory/60'} />
                        <span className={`font-medium ${paymentMethod === 'bank' ? 'text-gold' : 'text-ivory'}`}>Chuyển khoản ngân hàng</span>
                      </div>
                      <p className="text-ivory/50 text-sm">Thực hiện thanh toán vào tài khoản ngân hàng của chúng tôi. Đơn hàng sẽ được giao sau khi tiền đã chuyển.</p>
                      
                      {/* Bank Details (shows only when selected) */}
                      {paymentMethod === 'bank' && (
                        <div className="mt-4 p-4 bg-darker rounded border border-white/5 text-sm">
                          <p className="text-ivory/70 mb-2">Ngân hàng: <strong className="text-ivory">Vietcombank</strong></p>
                          <p className="text-ivory/70 mb-2">Số tài khoản: <strong className="text-gold tracking-wider">0123456789</strong></p>
                          <p className="text-ivory/70 mb-2">Tên chủ TK: <strong className="text-ivory">CTY TNHH NET KHAM</strong></p>
                          <p className="text-ivory/70">Nội dung CK: <strong className="text-ivory">SĐT của bạn + Tên của bạn</strong></p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button (Mobile) */}
              <div className="lg:hidden">
                <button type="submit" form="checkout-form" className="w-full py-4 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors rounded">
                  Đặt Hàng Ngay
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-dark p-8 rounded-lg border border-white/5 sticky top-28">
              <h2 className="text-2xl font-serif text-ivory mb-6 pb-4 border-b border-white/10">Đơn Hàng Của Bạn</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-darker rounded overflow-hidden shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-gold text-darker text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-ivory text-sm line-clamp-2 mb-1">{item.name}</h3>
                      <p className="text-gold text-sm font-medium">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-ivory/70 text-sm">
                  <span>Tạm tính</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-ivory/70 text-sm">
                  <span>Phí vận chuyển</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-gold text-sm">
                    <span>Giảm giá ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-ivory font-medium text-lg">Tổng cộng</span>
                <span className="text-3xl font-serif text-gold">{formatPrice(total)}</span>
              </div>

              {/* Submit Button (Desktop) */}
              <button 
                type="submit"
                form="checkout-form"
                className="hidden lg:flex w-full py-4 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors items-center justify-center rounded"
              >
                Đặt Hàng Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
