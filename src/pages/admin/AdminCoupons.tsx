import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Ticket, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/ConfirmModal';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  expiry: string;
  status: string;
}

export default function AdminCoupons() {
  const { addToast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({ code: '', discount: '', expiry: '', status: 'Hoạt động' });

  // Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/coupons');
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      addToast('Không thể tải danh sách mã giảm giá', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({ code: coupon.code, discount: coupon.discount, expiry: coupon.expiry, status: coupon.status });
    } else {
      setEditingCoupon(null);
      setFormData({ code: '', discount: '', expiry: '', status: 'Hoạt động' });
    }
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setCouponToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (couponToDelete) {
      try {
        const response = await fetch(`/api/coupons/${couponToDelete}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setCoupons(coupons.filter(c => c.id !== couponToDelete));
          addToast('Đã xóa mã giảm giá', 'success');
        } else {
          throw new Error('Failed to delete coupon');
        }
      } catch (error) {
        console.error('Error deleting coupon:', error);
        addToast('Có lỗi xảy ra khi xóa mã giảm giá', 'error');
      }
      setCouponToDelete(null);
      setIsConfirmOpen(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        const response = await fetch(`/api/coupons/${editingCoupon.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const updatedCoupon = await response.json();
          setCoupons(coupons.map(c => c.id === editingCoupon.id ? updatedCoupon : c));
          addToast('Cập nhật mã giảm giá thành công', 'success');
        } else {
          throw new Error('Failed to update coupon');
        }
      } else {
        const newCoupon = {
          id: `CPN-${Date.now()}`,
          ...formData
        };
        
        const response = await fetch('/api/coupons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCoupon),
        });
        
        if (response.ok) {
          const createdCoupon = await response.json();
          setCoupons([createdCoupon, ...coupons]);
          addToast('Thêm mã giảm giá mới thành công', 'success');
        } else {
          throw new Error('Failed to create coupon');
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving coupon:', error);
      addToast('Có lỗi xảy ra khi lưu mã giảm giá', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-serif text-ivory">Quản lý Mã giảm giá</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gold text-darker px-4 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          <Plus size={20} />
          Thêm mã mới
        </button>
      </div>

      <div className="bg-darker border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm mã giảm giá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="bg-darker rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-dark/50">
                <th className="p-4 text-ivory/60 font-medium text-sm">Mã giảm giá</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Mức giảm</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Hạn sử dụng</th>
                <th className="p-4 text-ivory/60 font-medium text-sm">Trạng thái</th>
                <th className="p-4 text-ivory/60 font-medium text-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                        <Ticket size={20} />
                      </div>
                      <span className="text-ivory font-bold tracking-wider">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="p-4 text-ivory/80 text-sm">{coupon.discount}</td>
                  <td className="p-4 text-ivory/80 text-sm">{coupon.expiry}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      coupon.status === 'Hoạt động' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-red-400/10 text-red-400 border-red-400/20'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenModal(coupon)} className="p-2 text-ivory/60 hover:text-gold hover:bg-gold/10 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => confirmDelete(coupon.id)} className="p-2 text-ivory/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ivory/40">Không tìm thấy mã giảm giá nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-darker border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-ivory">{editingCoupon ? 'Sửa mã giảm giá' : 'Thêm mã giảm giá'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ivory/60 hover:text-ivory"><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Mã code</label>
                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" placeholder="VD: SUMMER2026" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Mức giảm</label>
                <input required type="text" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" placeholder="VD: 10% hoặc 50.000đ" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Hạn sử dụng</label>
                <input required type="date" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Trạng thái</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold">
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Hết hạn">Hết hạn</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-ivory/60 hover:text-ivory transition-colors">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-gold text-darker font-medium rounded-lg hover:bg-gold-light transition-colors">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Xóa mã giảm giá"
        message="Bạn có chắc chắn muốn xóa mã giảm giá này? Hành động này không thể hoàn tác."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setCouponToDelete(null);
        }}
      />
    </div>
  );
}
