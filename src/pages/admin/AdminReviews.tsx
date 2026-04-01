import React, { useState, useEffect } from 'react';
import { Search, Star, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/ConfirmModal';

interface Review {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminReviews() {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        addToast('Không thể tải danh sách đánh giá', 'error');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      addToast('Có lỗi xảy ra', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = (id: string) => {
    setReviewToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (reviewToDelete) {
      try {
        const response = await fetch(`/api/reviews/${reviewToDelete}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setReviews(reviews.filter(r => r.id !== reviewToDelete));
          addToast('Đã xóa đánh giá', 'success');
        } else {
          addToast('Không thể xóa đánh giá', 'error');
        }
      } catch (error) {
        console.error('Error deleting review:', error);
        addToast('Có lỗi xảy ra', 'error');
      } finally {
        setReviewToDelete(null);
        setIsConfirmOpen(false);
      }
    }
  };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/reviews/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
        addToast(`Đã ${status === 'approved' ? 'duyệt' : 'từ chối'} đánh giá`, 'success');
      } else {
        addToast('Không thể cập nhật trạng thái', 'error');
      }
    } catch (error) {
      console.error('Error updating review status:', error);
      addToast('Có lỗi xảy ra', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-serif text-ivory">Quản lý Đánh giá</h2>
      </div>

      <div className="bg-darker border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm đánh giá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="bg-darker rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/10 bg-dark/50">
                <th className="p-4 text-ivory/60 font-medium text-sm">Sản phẩm</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Khách hàng</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Đánh giá</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Nội dung</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Ngày</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Trạng thái</th>
                <th className="p-4 text-ivory/60 font-medium text-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <span className="text-ivory font-medium">{review.productName}</span>
                  </td>
                  <td className="p-4 text-ivory/80 text-sm">{review.userName}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-gold text-gold" : "text-white/20"} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-ivory/80 text-sm max-w-xs truncate" title={review.content}>
                    {review.content}
                  </td>
                  <td className="p-4 text-ivory/80 text-sm">{review.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      review.status === 'approved' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 
                      review.status === 'rejected' ? 'bg-red-400/10 text-red-400 border-red-400/20' :
                      'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                    }`}>
                      {review.status === 'approved' ? 'Đã duyệt' : review.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {review.status === 'pending' && (
                        <>
                          <button onClick={() => handleUpdateStatus(review.id, 'approved')} className="p-2 text-ivory/60 hover:text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors" title="Duyệt">
                            <CheckCircle size={16} />
                          </button>
                          <button onClick={() => handleUpdateStatus(review.id, 'rejected')} className="p-2 text-ivory/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Từ chối">
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      <button onClick={() => confirmDelete(review.id)} className="p-2 text-ivory/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-ivory/40">Không tìm thấy đánh giá nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Xóa đánh giá"
        message="Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể hoàn tác."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setReviewToDelete(null);
        }}
      />
    </div>
  );
}
