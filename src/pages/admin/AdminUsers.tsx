import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Shield, User, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/ConfirmModal';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  joinDate: string;
}

export default function AdminUsers() {
  const { addToast } = useToast();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active'
  });

  // Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      addToast('Không thể tải danh sách người dùng', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (user?: UserData) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const response = await fetch(`/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const updatedUser = await response.json();
          setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
          addToast('Cập nhật thông tin tài khoản thành công', 'success');
        } else {
          throw new Error('Failed to update user');
        }
      } else {
        const newUser = {
          id: `USR-${Date.now()}`,
          ...formData,
          joinDate: new Date().toLocaleDateString('vi-VN')
        };
        
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
        
        if (response.ok) {
          const createdUser = await response.json();
          setUsers([createdUser, ...users]);
          addToast('Thêm tài khoản mới thành công', 'success');
        } else {
          throw new Error('Failed to create user');
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
      addToast('Có lỗi xảy ra khi lưu tài khoản', 'error');
    }
  };

  const confirmDelete = (id: string) => {
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(`/api/users/${userToDelete}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setUsers(users.filter(u => u.id !== userToDelete));
          addToast('Đã xóa tài khoản', 'success');
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        addToast('Có lỗi xảy ra khi xóa tài khoản', 'error');
      }
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-serif text-ivory">Quản lý Tài khoản</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gold text-darker px-4 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          + Thêm tài khoản mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-darker border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên hoặc email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-darker border border-white/5 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-ivory/60">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-dark/50">
                  <th className="p-4 text-sm font-medium text-ivory/60">Tài khoản</th>
                  <th className="p-4 text-sm font-medium text-ivory/60">Liên hệ</th>
                  <th className="p-4 text-sm font-medium text-ivory/60">Vai trò</th>
                  <th className="p-4 text-sm font-medium text-ivory/60">Trạng thái</th>
                  <th className="p-4 text-sm font-medium text-ivory/60">Ngày tham gia</th>
                  <th className="p-4 text-sm font-medium text-ivory/60 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                          {user.role === 'admin' ? <Shield size={20} /> : <User size={20} />}
                        </div>
                        <div>
                          <p className="text-ivory font-medium">{user.name}</p>
                          <p className="text-ivory/60 text-xs">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-ivory text-sm">{user.email}</p>
                      <p className="text-ivory/60 text-xs">{user.phone}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        user.role === 'admin' ? 'bg-purple-400/10 text-purple-400 border-purple-400/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20'
                      }`}>
                        {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        user.status === 'active' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-red-400/10 text-red-400 border-red-400/20'
                      }`}>
                        {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td className="p-4 text-ivory/80 text-sm">
                      {user.joinDate}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(user)}
                          className="p-2 text-ivory/60 hover:text-gold transition-colors"
                          title="Sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => confirmDelete(user.id)}
                          className="p-2 text-ivory/60 hover:text-red-400 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-ivory/40">
                Không tìm thấy tài khoản nào.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-darker border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-serif text-ivory mb-6">
              {editingUser ? 'Sửa thông tin tài khoản' : 'Thêm tài khoản mới'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Họ và tên</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Số điện thoại</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ivory/80 mb-1">Vai trò</label>
                  <select 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value as 'admin' | 'user'})}
                    className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="user">Khách hàng</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ivory/80 mb-1">Trạng thái</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                    className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Đã khóa</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-ivory/60 hover:text-ivory transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gold text-darker font-medium rounded-lg hover:bg-gold-light transition-colors"
                >
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Xóa tài khoản"
        message="Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
}
