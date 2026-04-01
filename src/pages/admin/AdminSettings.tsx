import React, { useState } from 'react';
import { Save, Globe, Mail, Bell, Shield, CreditCard } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function AdminSettings() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Cài đặt chung', icon: Globe },
    { id: 'email', name: 'Email & Thông báo', icon: Mail },
    { id: 'payment', name: 'Thanh toán', icon: CreditCard },
    { id: 'security', name: 'Bảo mật', icon: Shield },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-ivory">Cài đặt hệ thống</h2>
        <button 
          onClick={() => addToast('Đã lưu thay đổi cài đặt', 'success')}
          className="bg-gold text-darker px-4 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          Lưu thay đổi
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-darker border border-white/5 rounded-xl overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gold/10 text-gold border-l-2 border-gold'
                      : 'text-ivory/60 hover:bg-white/5 hover:text-ivory border-l-2 border-transparent'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-darker border border-white/5 rounded-xl p-6">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-medium text-ivory mb-4">Thông tin cửa hàng</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-ivory/60">Tên cửa hàng</label>
                  <input type="text" defaultValue="Nét Khảm" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ivory/60">Email liên hệ</label>
                  <input type="email" defaultValue="contact@netkham.com" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ivory/60">Số điện thoại</label>
                  <input type="tel" defaultValue="0901234567" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ivory/60">Đơn vị tiền tệ</label>
                  <select className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold">
                    <option value="VND">VND (₫)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-ivory/60">Địa chỉ cửa hàng</label>
                  <textarea rows={3} defaultValue="123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-medium text-ivory mb-4">Cấu hình Email</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark border border-white/5 rounded-lg">
                  <div>
                    <p className="text-ivory font-medium">Email xác nhận đơn hàng</p>
                    <p className="text-ivory/50 text-sm">Gửi email tự động khi khách hàng đặt hàng thành công</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark border border-white/5 rounded-lg">
                  <div>
                    <p className="text-ivory font-medium">Email thông báo giao hàng</p>
                    <p className="text-ivory/50 text-sm">Gửi email khi đơn hàng bắt đầu được giao</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark border border-white/5 rounded-lg">
                  <div>
                    <p className="text-ivory font-medium">Bản tin khuyến mãi</p>
                    <p className="text-ivory/50 text-sm">Cho phép khách hàng đăng ký nhận tin khuyến mãi</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-medium text-ivory mb-4">Phương thức thanh toán</h3>
              <div className="space-y-4">
                <div className="p-4 bg-dark border border-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center text-ivory">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-ivory font-medium">Chuyển khoản ngân hàng</p>
                        <p className="text-ivory/50 text-sm">Thanh toán qua tài khoản ngân hàng</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                      <label className="text-sm text-ivory/60">Tên ngân hàng</label>
                      <input type="text" defaultValue="Vietcombank" className="w-full bg-darker border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-ivory/60">Số tài khoản</label>
                      <input type="text" defaultValue="0123456789" className="w-full bg-darker border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-ivory/60">Tên chủ tài khoản</label>
                      <input type="text" defaultValue="CTY TNHH NET KHAM" className="w-full bg-darker border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-medium text-ivory mb-4">Bảo mật</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-ivory/60">Đổi mật khẩu Admin</label>
                  <input type="password" placeholder="Mật khẩu hiện tại" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold mb-2" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold mb-2" />
                  <input type="password" placeholder="Xác nhận mật khẩu mới" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-2 text-ivory focus:outline-none focus:border-gold" />
                </div>
                <div className="pt-2">
                  <button className="bg-white/10 text-ivory px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
