import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, LogOut, Settings, Edit2, ArrowLeft, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import ConfirmModal from '../components/ConfirmModal';

import { formatPrice } from '../data/products';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    isDefault: true,
  }
];

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
  itemsSummary: string;
  items: OrderItem[];
  address: string;
  paymentMethod?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchOrders(parsedUser.email);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchOrders = async (email: string) => {
    setLoadingOrders(true);
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        addToast('Không thể tải danh sách đơn hàng', 'error');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      addToast('Có lỗi xảy ra khi tải đơn hàng', 'error');
    } finally {
      setLoadingOrders(false);
    }
  };

  // Address State
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressFormData, setAddressFormData] = useState({ name: '', phone: '', address: '', isDefault: false });

  const handleOpenAddressModal = (addr?: Address) => {
    if (addr) {
      setEditingAddress(addr);
      setAddressFormData({ name: addr.name, phone: addr.phone, address: addr.address, isDefault: addr.isDefault });
    } else {
      setEditingAddress(null);
      setAddressFormData({ name: '', phone: '', address: '', isDefault: false });
    }
    setIsAddressModalOpen(true);
  };

  const confirmDeleteAddress = (id: string) => {
    setAddressToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteAddress = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter(a => a.id !== addressToDelete));
      addToast('Đã xóa địa chỉ thành công', 'success');
      setAddressToDelete(null);
    }
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    addToast('Đã đặt làm địa chỉ mặc định', 'success');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedAddresses = [...addresses];

    if (addressFormData.isDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    }

    if (editingAddress) {
      updatedAddresses = updatedAddresses.map(a =>
        a.id === editingAddress.id ? { ...a, ...addressFormData } : a
      );
      if (updatedAddresses.length === 1) updatedAddresses[0].isDefault = true;
    } else {
      const newAddr: Address = {
        id: Date.now().toString(),
        ...addressFormData,
        isDefault: updatedAddresses.length === 0 ? true : addressFormData.isDefault
      };
      updatedAddresses.push(newAddr);
    }
    setAddresses(updatedAddresses);
    setIsAddressModalOpen(false);
    addToast(editingAddress ? 'Đã cập nhật địa chỉ' : 'Đã thêm địa chỉ mới', 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedOrder(null); // Reset selected order when changing tabs
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    addToast('Đã lưu thay đổi thành công!', 'success');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-dark rounded-xl border border-white/5 p-6 flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-4 relative group cursor-pointer">
                <User size={40} />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit2 size={20} className="text-white" />
                </div>
              </div>
              <h2 className="text-xl font-serif text-ivory">{user?.name || 'Người dùng'}</h2>
              <p className="text-ivory/60 text-sm mb-4">{user?.email || ''}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20">
                Thành viên Vàng
              </span>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => handleTabChange('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-gold/10 text-gold' : 'text-ivory/60 hover:bg-white/5 hover:text-ivory'}`}
              >
                <Package size={20} />
                <span className="font-medium">Đơn hàng của tôi</span>
              </button>
              <button
                onClick={() => handleTabChange('address')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'address' ? 'bg-gold/10 text-gold' : 'text-ivory/60 hover:bg-white/5 hover:text-ivory'}`}
              >
                <MapPin size={20} />
                <span className="font-medium">Sổ địa chỉ</span>
              </button>
              <button
                onClick={() => handleTabChange('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-gold/10 text-gold' : 'text-ivory/60 hover:bg-white/5 hover:text-ivory'}`}
              >
                <Settings size={20} />
                <span className="font-medium">Cài đặt tài khoản</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400/70 hover:bg-red-400/10 hover:text-red-400 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div className="bg-dark rounded-xl border border-white/5 p-6">
                {!selectedOrder ? (
                  <>
                    <h3 className="text-2xl font-serif text-ivory mb-6">Đơn hàng của tôi</h3>
                    <div className="space-y-4">
                      {loadingOrders ? (
                        <p className="text-ivory/60 text-center py-8">Đang tải đơn hàng...</p>
                      ) : orders.length === 0 ? (
                        <p className="text-ivory/60 text-center py-8">Bạn chưa có đơn hàng nào.</p>
                      ) : (
                        orders.map((order) => (
                          <div key={order.id} className="border border-white/10 rounded-lg p-4 hover:border-gold/30 transition-colors">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                              <div>
                                <p className="text-ivory font-medium">{order.id}</p>
                                <p className="text-ivory/60 text-sm">Ngày đặt: {order.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-gold font-medium">{formatPrice(Number(order.total))}</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mt-1 ${
                                  order.status === 'Hoàn thành' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                              <p className="text-ivory/80 text-sm">{order.itemsSummary || `${order.items?.length || 0} sản phẩm`}</p>
                              <button onClick={() => setSelectedOrder(order)} className="text-gold text-sm hover:text-gold-light transition-colors">Xem chi tiết</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button 
                      onClick={() => setSelectedOrder(null)} 
                      className="flex items-center gap-2 text-ivory/60 hover:text-gold mb-6 transition-colors"
                    >
                      <ArrowLeft size={20} />
                      <span>Quay lại danh sách</span>
                    </button>
                    
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-serif text-ivory">Chi tiết đơn hàng</h3>
                        <p className="text-ivory/60 mt-1">Mã đơn: <span className="text-ivory">{selectedOrder.id}</span></p>
                        <p className="text-ivory/60 text-sm">Ngày đặt: {selectedOrder.date}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                        selectedOrder.status === 'Hoàn thành' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </div>

                    <div className="space-y-6">
                      {/* Items */}
                      <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
                        <h4 className="text-lg font-medium text-ivory mb-4">Sản phẩm</h4>
                        <div className="space-y-4">
                          {selectedOrder.items.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-darker border border-white/10" />
                              <div className="flex-1">
                                <p className="text-ivory font-medium">{item.name}</p>
                                <p className="text-ivory/60 text-sm">Số lượng: {item.quantity}</p>
                              </div>
                              <p className="text-gold font-medium">{formatPrice(Number(item.price))}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                          <span className="text-ivory/80">Tổng tiền</span>
                          <span className="text-xl text-gold font-serif">{formatPrice(Number(selectedOrder.total))}</span>
                        </div>
                      </div>

                      {/* Shipping & Payment */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
                          <h4 className="text-lg font-medium text-ivory mb-2">Địa chỉ giao hàng</h4>
                          <p className="text-ivory/80 text-sm whitespace-pre-line leading-relaxed">{selectedOrder.address}</p>
                        </div>
                        <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
                          <h4 className="text-lg font-medium text-ivory mb-2">Phương thức thanh toán</h4>
                          <p className="text-ivory/80 text-sm leading-relaxed">{selectedOrder.paymentMethod || 'Thanh toán khi nhận hàng (COD)'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'address' && (
              <div className="bg-dark rounded-xl border border-white/5 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif text-ivory">Sổ địa chỉ</h3>
                  <button onClick={() => handleOpenAddressModal()} className="text-gold text-sm hover:text-gold-light transition-colors">+ Thêm địa chỉ mới</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className={`border rounded-lg p-4 relative ${addr.isDefault ? 'border-gold/30 bg-gold/5' : 'border-white/10 bg-white/[0.02]'}`}>
                      {addr.isDefault && <span className="absolute top-4 right-4 text-xs bg-gold text-darker px-2 py-1 rounded font-medium">Mặc định</span>}
                      <p className="text-ivory font-medium mb-1">{addr.name}</p>
                      <p className="text-ivory/60 text-sm mb-1">{addr.phone}</p>
                      <p className="text-ivory/60 text-sm mb-4">{addr.address}</p>
                      <div className="flex gap-3 mt-4">
                        <button onClick={() => handleOpenAddressModal(addr)} className="text-gold text-sm hover:text-gold-light transition-colors">Sửa</button>
                        <button onClick={() => confirmDeleteAddress(addr.id)} className="text-red-400 text-sm hover:text-red-300 transition-colors">Xóa</button>
                        {!addr.isDefault && (
                          <button onClick={() => handleSetDefaultAddress(addr.id)} className="text-ivory/60 text-sm hover:text-ivory transition-colors">Đặt làm mặc định</button>
                        )}
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && (
                    <div className="col-span-full text-center py-8 text-ivory/40">
                      Bạn chưa có địa chỉ nào.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-dark rounded-xl border border-white/5 p-6">
                <h3 className="text-2xl font-serif text-ivory mb-6">Cài đặt tài khoản</h3>
                <form className="space-y-4 max-w-md" onSubmit={handleSaveSettings}>
                  <div>
                    <label className="block text-sm font-medium text-ivory/80 mb-1">Họ và tên</label>
                    <input type="text" defaultValue="Nguyễn Văn A" className="w-full px-3 py-2 bg-darker border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ivory/80 mb-1">Email</label>
                    <input type="email" defaultValue="khachhang@example.com" className="w-full px-3 py-2 bg-darker border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ivory/80 mb-1">Số điện thoại</label>
                    <input type="tel" defaultValue="0901234567" className="w-full px-3 py-2 bg-darker border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="bg-gold text-darker px-6 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors">
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-darker border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-ivory">{editingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}</h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="text-ivory/60 hover:text-ivory"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Họ và tên</label>
                <input required type="text" value={addressFormData.name} onChange={e => setAddressFormData({...addressFormData, name: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Số điện thoại</label>
                <input required type="tel" value={addressFormData.phone} onChange={e => setAddressFormData({...addressFormData, phone: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Địa chỉ chi tiết</label>
                <textarea required value={addressFormData.address} onChange={e => setAddressFormData({...addressFormData, address: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" rows={3}></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isDefault" checked={addressFormData.isDefault} onChange={e => setAddressFormData({...addressFormData, isDefault: e.target.checked})} className="rounded border-white/10 bg-dark text-gold focus:ring-gold" />
                <label htmlFor="isDefault" className="text-sm text-ivory/80">Đặt làm địa chỉ mặc định</label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddressModalOpen(false)} className="px-4 py-2 text-ivory/60 hover:text-ivory transition-colors">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-gold text-darker font-medium rounded-lg hover:bg-gold-light transition-colors">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Xóa địa chỉ"
        message="Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này không thể hoàn tác."
        onConfirm={handleDeleteAddress}
        onCancel={() => {
          setIsConfirmOpen(false);
          setAddressToDelete(null);
        }}
      />
    </div>
  );
}
