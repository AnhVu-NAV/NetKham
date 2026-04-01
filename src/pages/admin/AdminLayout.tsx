import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Ticket, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.role === 'admin') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-dark flex items-center justify-center text-ivory">Đang kiểm tra quyền truy cập...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Tổng quan', path: '/admin', icon: LayoutDashboard },
    { name: 'Sản phẩm', path: '/admin/products', icon: Package },
    { name: 'Đơn hàng', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Mã giảm giá', path: '/admin/coupons', icon: Ticket },
    { name: 'Tài khoản', path: '/admin/users', icon: Users },
    { name: 'Đánh giá', path: '/admin/reviews', icon: Star },
    { name: 'Cài đặt', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-darker border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-2xl font-serif font-bold tracking-wider text-ivory flex items-center">
            <span className="text-gold mr-1">Nét</span> Khảm
            <span className="text-xs text-gold/60 ml-2 uppercase tracking-widest font-sans">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-gold/10 text-gold' : 'text-ivory/60 hover:bg-white/5 hover:text-ivory'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400/70 hover:bg-red-400/10 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-20 border-b border-white/5 bg-darker/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-serif text-ivory">
            {navItems.find(item => item.path === location.pathname)?.name || 'Quản trị'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
