import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { compareItems } = useCompare();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check user auth state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Sản Phẩm', path: '/products' },
    { name: 'Bộ Sưu Tập', path: '/collections' },
    { name: 'Giới Thiệu', path: '/about' },
    { name: 'Tin Tức', path: '/blog' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-darker/95 backdrop-blur-md py-3 shadow-md border-b border-white/5' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ivory hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-ivory flex items-center">
              <span className="text-gold mr-1">Nét</span> Khảm
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-ivory/80 hover:text-gold transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button 
              className="text-ivory hover:text-gold transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            {user ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-2 text-ivory hover:text-gold transition-colors focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-gold text-darker flex items-center justify-center font-bold uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-darker border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link 
                      to={user.role === 'admin' ? '/admin' : '/profile'} 
                      className="block px-4 py-2 text-sm text-ivory/80 hover:text-gold hover:bg-white/5 transition-colors"
                    >
                      {user.role === 'admin' ? 'Trang quản trị' : 'Trang cá nhân'}
                    </Link>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('user');
                        setUser(null);
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block text-ivory hover:text-gold transition-colors">
                <User size={20} />
              </Link>
            )}
            <Link to="/compare" className="text-ivory hover:text-gold transition-colors relative">
              <Scale size={20} />
              {compareItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-darker text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-ivory hover:text-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-darker text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 bg-darker z-50 flex flex-col pt-20 px-6"
            >
              <button
                className="absolute top-6 right-6 text-ivory hover:text-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={28} />
              </button>
              <div className="flex flex-col space-y-6 text-center mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-serif text-ivory hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-6">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 text-ivory">
                        <div className="w-10 h-10 rounded-full bg-gold text-darker flex items-center justify-center font-bold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-lg">{user.name}</span>
                      </div>
                      <Link 
                        to={user.role === 'admin' ? '/admin' : '/profile'} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-ivory/80 hover:text-gold transition-colors"
                      >
                        {user.role === 'admin' ? 'Trang quản trị' : 'Trang cá nhân'}
                      </Link>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('user');
                          setUser(null);
                          setIsMobileMenuOpen(false);
                          navigate('/');
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-ivory hover:text-gold flex items-center gap-2">
                      <User size={20} /> Đăng nhập
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-darker/95 backdrop-blur-sm z-[60] flex items-start justify-center pt-32 px-4"
          >
            <div className="w-full max-w-3xl relative">
              <button
                className="absolute -top-12 right-0 text-ivory/60 hover:text-gold transition-colors"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={24} />
              </button>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" size={24} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full bg-dark border-b-2 border-white/10 text-ivory text-xl md:text-2xl py-4 pl-14 pr-4 focus:outline-none focus:border-gold transition-colors rounded-t-lg"
                />
              </form>
              <div className="bg-dark p-6 rounded-b-lg border border-t-0 border-white/5">
                <p className="text-ivory/40 text-sm mb-4">Gợi ý tìm kiếm:</p>
                <div className="flex flex-wrap gap-2">
                  {['Trâm cài', 'Dây chuyền', 'Hộp trang sức', 'Hoa tai'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setIsSearchOpen(false);
                        navigate(`/products?search=${encodeURIComponent(term)}`);
                      }}
                      className="px-4 py-2 bg-darker border border-white/10 rounded-full text-sm text-ivory/80 hover:border-gold hover:text-gold transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
