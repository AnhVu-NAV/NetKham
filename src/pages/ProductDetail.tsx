import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, ChevronRight, Star, Minus, Plus, User } from 'lucide-react';
import { formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading } = useProducts();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch(`/api/products/${id}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darker">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-ivory mb-4">Đang tải sản phẩm...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darker">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-ivory mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/products" className="text-gold hover:underline">Quay lại cửa hàng</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`, 'success');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim()) {
      addToast('Vui lòng nhập nội dung đánh giá', 'error');
      return;
    }

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userName = user ? user.name : 'Khách';

    try {
      const response = await fetch(`/api/products/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          rating: reviewRating,
          content: reviewContent
        }),
      });

      if (response.ok) {
        addToast('Đánh giá của bạn đã được gửi và đang chờ duyệt!', 'success');
        setIsWritingReview(false);
        setReviewContent('');
        setReviewRating(5);
        fetchReviews();
      } else {
        addToast('Có lỗi xảy ra khi gửi đánh giá', 'error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      addToast('Có lỗi xảy ra khi gửi đánh giá', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <nav className="flex items-center text-sm text-ivory/60 gap-2">
          <Link to="/" className="hover:text-gold transition-colors">Trang Chủ</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-gold transition-colors">Sản Phẩm</Link>
          <ChevronRight size={14} />
          <span className="text-ivory">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          {/* Image Gallery */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 hide-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-1 aspect-[4/5] bg-dark rounded-lg overflow-hidden">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-gold text-darker text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm z-10">
                  Mới
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-gold uppercase tracking-widest text-sm mb-3">{product.category}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ivory mb-4 leading-tight">
              {product.name}
            </h1>
            
            {/* Reviews Summary */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-ivory/60 text-sm">(12 đánh giá)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-medium text-gold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-ivory/40 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-ivory/70 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Details List */}
            <ul className="space-y-3 mb-10 text-sm">
              <li className="flex gap-4 border-b border-white/10 pb-3">
                <span className="text-ivory/50 w-24 shrink-0">Chất liệu:</span>
                <span className="text-ivory">{product.material}</span>
              </li>
              <li className="flex gap-4 border-b border-white/10 pb-3">
                <span className="text-ivory/50 w-24 shrink-0">Tình trạng:</span>
                <span className="text-emerald-400">Còn hàng</span>
              </li>
              <li className="flex gap-4 border-b border-white/10 pb-3">
                <span className="text-ivory/50 w-24 shrink-0">Mã SP:</span>
                <span className="text-ivory uppercase">{product.id}</span>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-white/20 rounded-md h-14 w-full sm:w-32 bg-dark">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  readOnly
                  className="flex-1 h-full bg-transparent text-center text-ivory font-medium focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-gold text-darker font-medium tracking-wider uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2 rounded-md"
              >
                <ShoppingBag size={20} />
                Thêm Vào Giỏ
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => addToast('Đã thêm vào danh sách yêu thích', 'success')}
                className="flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors text-sm uppercase tracking-wider"
              >
                <Heart size={18} /> Yêu thích
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  addToast('Đã sao chép đường dẫn', 'info');
                }}
                className="flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors text-sm uppercase tracking-wider"
              >
                <Share2 size={18} /> Chia sẻ
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section (Description, Reviews) */}
        <div className="mb-24">
          <div className="flex border-b border-white/10 mb-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-8 py-4 font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'description' ? 'text-gold border-b-2 border-gold' : 'text-ivory/50 hover:text-ivory'
              }`}
            >
              Chi Tiết Sản Phẩm
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-4 font-medium uppercase tracking-wider transition-colors ${
                activeTab === 'reviews' ? 'text-gold border-b-2 border-gold' : 'text-ivory/50 hover:text-ivory'
              }`}
            >
              Đánh Giá ({reviews.length})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3 prose prose-invert prose-gold max-w-none">
                <p className="text-ivory/70 leading-relaxed mb-6">
                  Sản phẩm được chế tác hoàn toàn thủ công bởi những nghệ nhân có hơn 20 năm kinh nghiệm trong nghề khảm xà cừ truyền thống. Mỗi mảnh xà cừ đều được tuyển chọn kỹ lưỡng từ những vỏ trai, vỏ ốc tự nhiên tốt nhất, mang đến độ sáng bóng và hiệu ứng màu sắc độc bản dưới các góc nhìn khác nhau.
                </p>
                <p className="text-ivory/70 leading-relaxed">
                  Quy trình chế tác đòi hỏi sự tỉ mỉ và kiên nhẫn tột độ, từ khâu phác thảo hoa văn, cưa cắt xà cừ, đục nền gỗ, đến khảm, mài nhẵn và đánh bóng nhiều lần. Kết quả là một tác phẩm nghệ thuật tinh xảo, nơi vẻ đẹp của thiên nhiên hòa quyện cùng tài hoa của con người.
                </p>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-darker border border-white/10 rounded-lg overflow-hidden">
                  <h3 className="bg-dark px-6 py-4 text-lg font-serif text-ivory border-b border-white/10">Thông số kỹ thuật</h3>
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="px-6 py-4 text-ivory/60 w-2/5 bg-white/[0.02] font-medium">Chất liệu</td>
                        <td className="px-6 py-4 text-ivory">{product.material}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-ivory/60 w-2/5 bg-white/[0.02] font-medium">Kích thước</td>
                        <td className="px-6 py-4 text-ivory">Tiêu chuẩn / Tùy chỉnh</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-ivory/60 w-2/5 bg-white/[0.02] font-medium">Xuất xứ</td>
                        <td className="px-6 py-4 text-ivory">Việt Nam</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-ivory/60 w-2/5 bg-white/[0.02] font-medium">Bảo hành</td>
                        <td className="px-6 py-4 text-ivory">12 tháng</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-ivory/60 w-2/5 bg-white/[0.02] font-medium">Thương hiệu</td>
                        <td className="px-6 py-4 text-ivory">Nét Khảm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Reviews Summary */}
              <div className="lg:w-1/3">
                <div className="bg-dark p-8 rounded-lg border border-white/5 text-center">
                  <h3 className="text-xl font-serif text-ivory mb-2">Đánh Giá Trung Bình</h3>
                  <div className="text-5xl font-serif text-gold mb-4">
                    {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0.0'}
                  </div>
                  <div className="flex justify-center text-gold mb-2">
                    {[...Array(5)].map((_, i) => {
                      const avgRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
                      return (
                        <Star key={i} size={20} fill={i < Math.round(avgRating) ? "currentColor" : "none"} className={i >= Math.round(avgRating) ? "text-gold/50" : ""} />
                      );
                    })}
                  </div>
                  <p className="text-ivory/60 text-sm mb-8">Dựa trên {reviews.length} đánh giá</p>
                  
                  <button 
                    onClick={() => setIsWritingReview(!isWritingReview)}
                    className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-darker transition-colors uppercase tracking-wider text-sm font-medium rounded"
                  >
                    {isWritingReview ? 'Hủy' : 'Viết Đánh Giá'}
                  </button>
                </div>
              </div>

              {/* Reviews List & Form */}
              <div className="lg:w-2/3 space-y-6">
                {isWritingReview && (
                  <div className="bg-darker p-6 rounded-lg border border-gold/30 mb-8">
                    <h4 className="text-lg font-serif text-ivory mb-4">Đánh giá của bạn</h4>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-4">
                        <label className="block text-ivory/70 text-sm mb-2">Chất lượng sản phẩm</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star 
                                size={24} 
                                fill={star <= reviewRating ? "currentColor" : "none"} 
                                className={star <= reviewRating ? "text-gold" : "text-ivory/30"} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-ivory/70 text-sm mb-2">Nội dung đánh giá</label>
                        <textarea
                          rows={4}
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                          className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors resize-none"
                          placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="px-6 py-2 bg-gold text-darker font-medium uppercase tracking-wider hover:bg-gold-light transition-colors rounded text-sm"
                      >
                        Gửi Đánh Giá
                      </button>
                    </form>
                  </div>
                )}
                
                {loadingReviews ? (
                  <p className="text-ivory/60 text-center py-8">Đang tải đánh giá...</p>
                ) : reviews.length === 0 ? (
                  <p className="text-ivory/60 text-center py-8">Chưa có đánh giá nào cho sản phẩm này.</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-darker p-6 rounded-lg border border-white/5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-dark flex items-center justify-center text-ivory/50">
                            <User size={24} />
                          </div>
                          <div>
                            <h4 className="text-ivory font-medium">{review.userName}</h4>
                            <span className="text-ivory/40 text-xs">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex text-gold">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gold/30" : ""} />
                          ))}
                        </div>
                      </div>
                      <p className="text-ivory/70 text-sm leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-ivory mb-4">Sản Phẩm Liên Quan</h2>
              <div className="w-16 h-[1px] bg-gold mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
