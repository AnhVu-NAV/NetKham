import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call
    setIsSubmitted(true);
    addToast('Hướng dẫn khôi phục mật khẩu đã được gửi đến email của bạn');
  };

  return (
    <div className="min-h-screen bg-darker flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="text-3xl font-serif font-bold tracking-wider text-ivory flex items-center justify-center mb-8">
          <span className="text-gold mr-1">Nét</span> Khảm
        </Link>
        <h2 className="text-center text-3xl font-serif text-ivory">
          Quên mật khẩu
        </h2>
        <p className="mt-2 text-center text-sm text-ivory/60">
          Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-white/5">
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-darker text-ivory placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-darker bg-gold hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:ring-offset-darker transition-colors"
                >
                  Gửi hướng dẫn <ArrowRight size={16} />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-ivory mb-2">Kiểm tra email của bạn</h3>
                <p className="text-ivory/60 text-sm">
                  Chúng tôi đã gửi một liên kết khôi phục mật khẩu đến <span className="text-ivory font-medium">{email}</span>. Vui lòng kiểm tra hộp thư đến của bạn.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-ivory/60 hover:text-gold transition-colors">
              <ArrowLeft size={16} /> Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
