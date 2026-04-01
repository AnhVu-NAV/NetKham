import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/ConfirmModal';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: any[];
}

export default function AdminOrders() {
  const { addToast } = useToast();
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');

  // Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrderList(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      addToast('Không thể tải danh sách đơn hàng', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orderList.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Hoàn thành': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      case 'Đang xử lý': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'Đang giao': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'Đã hủy': return 'bg-red-400/10 text-red-400 border-red-400/20';
      default: return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const handleOpenModal = (order: Order) => {
    setEditingOrder(order);
    setNewStatus(order.status);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setOrderToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (orderToDelete) {
      try {
        const response = await fetch(`/api/orders/${orderToDelete}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setOrderList(orderList.filter(o => o.id !== orderToDelete));
          addToast('Đã xóa đơn hàng', 'success');
        } else {
          throw new Error('Failed to delete order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        addToast('Có lỗi xảy ra khi xóa đơn hàng', 'error');
      }
      setOrderToDelete(null);
    }
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      try {
        const response = await fetch(`/api/orders/${editingOrder.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
        
        if (response.ok) {
          const updatedOrder = await response.json();
          setOrderList(orderList.map(o => 
            o.id === editingOrder.id ? updatedOrder : o
          ));
          addToast('Cập nhật trạng thái đơn hàng thành công', 'success');
        } else {
          throw new Error('Failed to update order status');
        }
      } catch (error) {
        console.error('Error updating order status:', error);
        addToast('Có lỗi xảy ra khi cập nhật trạng thái', 'error');
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-serif text-ivory">Quản lý Đơn hàng</h2>
      </div>

      <div className="bg-darker border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm mã đơn, tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-dark border border-white/10 text-ivory rounded-lg focus:ring-gold focus:border-gold block p-2.5"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="bg-darker rounded-xl border border-white/5 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-ivory/60">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 bg-dark/50">
                  <th className="p-4 text-ivory/60 font-medium text-sm">Mã đơn hàng</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm">Khách hàng</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm">Ngày đặt</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm">Tổng tiền</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm">Trạng thái</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-ivory font-medium text-sm">{order.id}</td>
                    <td className="p-4 text-ivory/80 text-sm">{order.customer}</td>
                    <td className="p-4 text-ivory/60 text-sm">{order.date}</td>
                    <td className="p-4 text-gold font-medium text-sm">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal(order)} className="p-2 text-ivory/60 hover:text-gold hover:bg-gold/10 rounded transition-colors" title="Cập nhật trạng thái">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => confirmDelete(order.id)} className="p-2 text-ivory/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Xóa">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-ivory/40">Không tìm thấy đơn hàng nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Cập nhật trạng thái */}
      {isModalOpen && editingOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-darker border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-ivory">Cập nhật trạng thái đơn</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ivory/60 hover:text-ivory"><X size={24} /></button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-ivory/60 mb-1">Mã đơn hàng: <span className="text-ivory font-medium">{editingOrder.id}</span></p>
              <p className="text-sm text-ivory/60">Khách hàng: <span className="text-ivory font-medium">{editingOrder.customer}</span></p>
            </div>
            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Trạng thái mới</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold">
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đang giao">Đang giao</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-ivory/60 hover:text-ivory transition-colors">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-gold text-darker font-medium rounded-lg hover:bg-gold-light transition-colors">Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Xóa đơn hàng"
        message="Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setOrderToDelete(null);
        }}
      />
    </div>
  );
}
