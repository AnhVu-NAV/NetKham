import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'admin') {
          addToast('Đăng nhập quản trị thành công!', 'success');
          navigate('/admin');
        } else {
          addToast('Đăng nhập thành công!', 'success');
          navigate('/profile');
        }
      } else {
        addToast(data.error || 'Đăng nhập thất bại', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      addToast('Có lỗi xảy ra khi đăng nhập', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-darker flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 text-ivory/60 hover:text-gold transition-colors">
          <ArrowLeft size={20} /> Quay lại trang chủ
        </Link>
        <h2 className="text-center text-4xl font-serif text-ivory mb-2">
          <span className="text-gold">Nét</span> Khảm
        </h2>
        <h3 className="text-center text-xl text-ivory/80 font-medium">Đăng nhập tài khoản</h3>
        <p className="mt-2 text-center text-sm text-ivory/60">
          Hoặc{' '}
          <Link to="/register" className="font-medium text-gold hover:text-gold-light transition-colors">
            tạo tài khoản mới
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/5">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-ivory/80 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-ivory/40" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-md bg-darker text-ivory placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm transition-colors"
                  placeholder="admin@netkham.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ivory/80 mb-2">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-ivory/40" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-md bg-darker text-ivory placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-darker border-white/10 rounded text-gold focus:ring-gold focus:ring-offset-dark"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-ivory/60">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-gold hover:text-gold-light">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-darker bg-gold hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:ring-offset-dark transition-colors uppercase tracking-wider"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-ivory/60 bg-darker/50 p-4 rounded-lg border border-white/5">
            <p className="mb-2 font-medium text-ivory/80">Bạn chưa có tài khoản?</p>
            <Link to="/register" className="inline-block mt-2 px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-darker transition-colors rounded-md font-medium uppercase tracking-wider text-xs">
              Đăng ký tài khoản ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
