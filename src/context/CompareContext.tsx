import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';
import { useToast } from './ToastContext';

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const { addToast } = useToast();

  const addToCompare = (product: Product) => {
    setCompareItems((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        addToast('Sản phẩm đã có trong danh sách so sánh', 'info');
        return prev;
      }
      if (prev.length >= 4) {
        addToast('Bạn chỉ có thể so sánh tối đa 4 sản phẩm cùng lúc', 'info');
        return prev;
      }
      addToast('Đã thêm vào danh sách so sánh', 'success');
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== productId));
    addToast('Đã xóa khỏi danh sách so sánh', 'info');
  };

  const clearCompare = () => {
    setCompareItems([]);
    addToast('Đã xóa tất cả sản phẩm so sánh', 'info');
  };

  const isInCompare = (productId: string) => {
    return compareItems.some((p) => p.id === productId);
  };

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
