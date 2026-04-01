import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { formatPrice, Product } from '../../data/products';
import { useToast } from '../../context/ToastContext';
import { useProducts } from '../../context/ProductContext';
import ConfirmModal from '../../components/ConfirmModal';

export default function AdminProducts() {
  const { addToast } = useToast();
  const { products: productList, isLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Trâm gương lược',
    price: '',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?q=80&w=800&auto=format&fit=crop',
    images: '',
    description: '',
    material: '',
    isNew: false,
    isBestSeller: false
  });

  // Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const filteredProducts = productList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        image: product.image,
        images: product.images ? product.images.join('\n') : product.image,
        description: product.description || '',
        material: product.material || '',
        isNew: product.isNew || false,
        isBestSeller: product.isBestSeller || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Trâm gương lược',
        price: '',
        image: 'https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?q=80&w=800&auto=format&fit=crop',
        images: '',
        description: '',
        material: '',
        isNew: false,
        isBestSeller: false
      });
    }
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        addToast('Đã xóa sản phẩm', 'success');
      } catch (error) {
        addToast('Lỗi khi xóa sản phẩm', 'error');
      }
      setProductToDelete(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(formData.price.replace(/\D/g, ''), 10) || 0;
    
    const imagesArray = formData.images
      ? formData.images.split('\n').map(url => url.trim()).filter(url => url !== '')
      : [formData.image];
      
    if (imagesArray.length === 0) {
      imagesArray.push(formData.image);
    }
    
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, { 
          name: formData.name, 
          category: formData.category, 
          price: priceNum, 
          image: formData.image,
          images: imagesArray,
          description: formData.description,
          material: formData.material,
          isNew: formData.isNew,
          isBestSeller: formData.isBestSeller
        });
        addToast('Cập nhật sản phẩm thành công', 'success');
      } else {
        const newProduct: Product = {
          id: `SP${Date.now().toString().slice(-4)}`,
          name: formData.name,
          category: formData.category,
          price: priceNum,
          image: formData.image,
          images: imagesArray,
          description: formData.description || 'Mô tả sản phẩm mới...',
          material: formData.material || 'Gỗ, Xà cừ',
          isNew: formData.isNew,
          isBestSeller: formData.isBestSeller
        };
        await addProduct(newProduct);
        addToast('Thêm sản phẩm mới thành công', 'success');
      }
      setIsModalOpen(false);
    } catch (error) {
      addToast('Có lỗi xảy ra', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-serif text-ivory">Quản lý Sản phẩm</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gold text-darker px-4 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      <div className="bg-darker border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="bg-darker rounded-xl border border-white/5 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-ivory/60">Đang tải sản phẩm...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 bg-dark/50">
                  <th className="p-4 text-ivory/60 font-medium text-sm">Sản phẩm</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm">Danh mục</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm">Giá</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm">Trạng thái</th>
                  <th className="p-4 text-ivory/60 font-medium text-sm text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-dark overflow-hidden shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-ivory font-medium line-clamp-1">{product.name}</p>
                          <p className="text-ivory/40 text-xs uppercase">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-ivory/80 text-sm">{product.category}</td>
                    <td className="p-4 text-gold font-medium text-sm">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                        Còn hàng
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal(product)} className="p-2 text-ivory/60 hover:text-gold hover:bg-gold/10 rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => confirmDelete(product.id)} className="p-2 text-ivory/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-ivory/40">Không tìm thấy sản phẩm nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Thêm/Sửa Sản phẩm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-darker border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-ivory">{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ivory/60 hover:text-ivory"><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Tên sản phẩm</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Danh mục</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold">
                  <option value="Trâm gương lược">Trâm gương lược</option>
                  <option value="Trang sức">Trang sức</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                  <option value="Bộ quà tặng">Bộ quà tặng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Giá (VNĐ)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">URL Hình ảnh chính</label>
                <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">URL Hình ảnh phụ (Mỗi link 1 dòng)</label>
                <textarea rows={3} value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold resize-none" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Mô tả</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ivory/80 mb-1">Chất liệu</label>
                <input type="text" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} className="w-full px-3 py-2 bg-dark border border-white/10 rounded-lg text-ivory focus:outline-none focus:border-gold" />
              </div>
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm font-medium text-ivory/80 cursor-pointer">
                  <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} className="rounded bg-dark border-white/10 text-gold focus:ring-gold" />
                  Sản phẩm mới
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-ivory/80 cursor-pointer">
                  <input type="checkbox" checked={formData.isBestSeller} onChange={e => setFormData({...formData, isBestSeller: e.target.checked})} className="rounded bg-dark border-white/10 text-gold focus:ring-gold" />
                  Bán chạy
                </label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-ivory/60 hover:text-ivory transition-colors">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-gold text-darker font-medium rounded-lg hover:bg-gold-light transition-colors">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setProductToDelete(null);
        }}
      />
    </div>
  );
}
