import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Mật khẩu xác nhận không khớp', 'error');
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        addToast('Đăng ký tài khoản thành công!', 'success');
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/profile');
      } else {
        addToast(data.error || 'Đăng ký thất bại', 'error');
      }
    } catch (error) {
      console.error('Register error:', error);
      addToast('Có lỗi xảy ra khi đăng ký', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-darker flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="text-3xl font-serif font-bold tracking-wider text-ivory flex items-center justify-center mb-8">
          <span className="text-gold mr-1">Nét</span> Khảm
        </Link>
        <h2 className="text-center text-3xl font-serif text-ivory">
          Tạo tài khoản mới
        </h2>
        <p className="mt-2 text-center text-sm text-ivory/60">
          Hoặc{' '}
          <Link to="/login" className="font-medium text-gold hover:text-gold-light transition-colors">
            đăng nhập vào tài khoản hiện có
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-white/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-ivory/80">
                Họ và tên
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-ivory/40" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-darker text-ivory placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm transition-colors"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ivory/80">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-ivory/40" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-darker text-ivory placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ivory/80">
                Mật khẩu
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-ivory/40" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-darker text-ivory placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ivory/80">
                Xác nhận mật khẩu
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-ivory/40" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-darker text-ivory placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-darker bg-gold hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:ring-offset-darker transition-colors"
              >
                Đăng ký <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
