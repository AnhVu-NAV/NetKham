import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X, Search as SearchIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export default function Products() {
  const { products, isLoading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const collectionParam = searchParams.get('collection');
  
  const categories = ['all', 'Trâm gương lược', 'Trang sức', 'Phụ kiện', 'Bộ quà tặng'];

  // Map URL param back to actual category name
  const initialCategory = categories.find(c => c.toLowerCase().replace(/ /g, '-') === categoryParam) || 'all';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const newCategory = categories.find(c => c.toLowerCase().replace(/ /g, '-') === categoryParam) || 'all';
    setSelectedCategory(newCategory);
  }, [categoryParam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, searchParam, priceFilters, collectionParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchParam) {
      const query = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    if (collectionParam) {
      // Mock collection filtering based on ID
      if (collectionParam === 'hoang-cung') {
        result = result.filter(p => p.price >= 2000000); // Just a mock rule
      } else if (collectionParam === 'nang-tho') {
        result = result.filter(p => p.category === 'Trang sức');
      } else if (collectionParam === 'tu-quy') {
        result = result.filter(p => p.category === 'Bộ quà tặng');
      }
    }

    if (priceFilters.length > 0) {
      result = result.filter(p => {
        return priceFilters.some(filter => {
          if (filter === 'under-1m') return p.price < 1000000;
          if (filter === '1m-3m') return p.price >= 1000000 && p.price <= 3000000;
          if (filter === 'over-3m') return p.price > 3000000;
          return false;
        });
      });
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bestseller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchParam, priceFilters, collectionParam, products]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat.toLowerCase().replace(/ /g, '-'));
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const clearCollection = () => {
    searchParams.delete('collection');
    setSearchParams(searchParams);
  };

  const handlePriceFilterChange = (filter: string) => {
    setPriceFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-darker pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-dark py-16 mb-12 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-4">Bộ Sưu Tập</h1>
          <p className="text-ivory/60 max-w-2xl mx-auto">
            Khám phá những tuyệt tác khảm xà cừ được chế tác thủ công tinh xảo, mang đậm dấu ấn văn hóa và nghệ thuật truyền thống.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar / Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-28 bg-dark p-6 rounded-lg border border-white/5">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="text-xl font-serif text-ivory">Bộ Lọc</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-ivory/60 hover:text-gold">
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-gold uppercase tracking-widest text-sm font-medium mb-4">Danh Mục</h4>
                <ul className="space-y-3">
                  {categories.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`text-left w-full transition-colors ${
                          selectedCategory === cat ? 'text-gold font-medium' : 'text-ivory/70 hover:text-ivory'
                        }`}
                      >
                        {cat === 'all' ? 'Tất cả sản phẩm' : cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-gold uppercase tracking-widest text-sm font-medium mb-4">Mức Giá</h4>
                <ul className="space-y-3">
                  <li>
                    <label className="flex items-center gap-3 text-ivory/70 cursor-pointer hover:text-ivory">
                      <input 
                        type="checkbox" 
                        checked={priceFilters.includes('under-1m')}
                        onChange={() => handlePriceFilterChange('under-1m')}
                        className="accent-gold w-4 h-4 bg-darker border-white/20 rounded" 
                      /> Dưới 1,000,000đ
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 text-ivory/70 cursor-pointer hover:text-ivory">
                      <input 
                        type="checkbox" 
                        checked={priceFilters.includes('1m-3m')}
                        onChange={() => handlePriceFilterChange('1m-3m')}
                        className="accent-gold w-4 h-4 bg-darker border-white/20 rounded" 
                      /> 1,000,000đ - 3,000,000đ
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 text-ivory/70 cursor-pointer hover:text-ivory">
                      <input 
                        type="checkbox" 
                        checked={priceFilters.includes('over-3m')}
                        onChange={() => handlePriceFilterChange('over-3m')}
                        className="accent-gold w-4 h-4 bg-darker border-white/20 rounded" 
                      /> Trên 3,000,000đ
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Results Indicator */}
            {searchParam && (
              <div className="mb-6 flex items-center justify-between bg-dark p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <SearchIcon size={20} className="text-gold" />
                  <span className="text-ivory">
                    Kết quả tìm kiếm cho: <span className="font-medium text-gold">"{searchParam}"</span>
                  </span>
                </div>
                <button 
                  onClick={clearSearch}
                  className="text-ivory/60 hover:text-ivory flex items-center gap-1 text-sm"
                >
                  <X size={16} /> Xóa tìm kiếm
                </button>
              </div>
            )}

            {/* Collection Indicator */}
            {collectionParam && (
              <div className="mb-6 flex items-center justify-between bg-dark p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-ivory">
                    Bộ sưu tập: <span className="font-medium text-gold uppercase tracking-wider">
                      {collectionParam === 'hoang-cung' ? 'Hoàng Cung' : 
                       collectionParam === 'nang-tho' ? 'Nàng Thơ' : 
                       collectionParam === 'tu-quy' ? 'Tứ Quý' : collectionParam}
                    </span>
                  </span>
                </div>
                <button 
                  onClick={clearCollection}
                  className="text-ivory/60 hover:text-ivory flex items-center gap-1 text-sm"
                >
                  <X size={16} /> Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <button 
                className="lg:hidden flex items-center gap-2 text-ivory border border-white/20 px-4 py-2 rounded hover:border-gold hover:text-gold transition-colors w-full sm:w-auto justify-center"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter size={18} /> Lọc Sản Phẩm
              </button>
              
              <div className="text-ivory/60 text-sm">
                Hiển thị <span className="text-ivory font-medium">{filteredProducts.length}</span> sản phẩm
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-ivory/60 text-sm whitespace-nowrap">Sắp xếp:</span>
                <div className="relative w-full sm:w-48">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-dark border border-white/20 text-ivory py-2 pl-4 pr-10 rounded focus:outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="bestseller">Bán chạy</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/50 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="text-center py-20 bg-dark rounded-lg border border-white/5">
                <p className="text-ivory/60 text-lg">Đang tải sản phẩm...</p>
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded border border-white/20 text-ivory hover:border-gold hover:text-gold disabled:opacity-50 disabled:hover:border-white/20 disabled:hover:text-ivory transition-colors"
                    >
                      Trước
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded flex items-center justify-center border transition-colors ${
                            currentPage === page 
                              ? 'bg-gold border-gold text-darker font-medium' 
                              : 'border-white/20 text-ivory hover:border-gold hover:text-gold'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded border border-white/20 text-ivory hover:border-gold hover:text-gold disabled:opacity-50 disabled:hover:border-white/20 disabled:hover:text-ivory transition-colors"
                    >
                      Sau
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-dark rounded-lg border border-white/5">
                <p className="text-ivory/60 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
                <button 
                  onClick={() => {
                    handleCategoryChange('all');
                    clearSearch();
                  }}
                  className="mt-4 text-gold hover:text-gold-light underline underline-offset-4"
                >
                  Xóa bộ lọc và tìm kiếm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
