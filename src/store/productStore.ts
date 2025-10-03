import { create } from 'zustand';
import { Product } from '../types';
import { sampleProducts } from '../data/sampleData';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  categoryFilter: string;
}

interface ProductStore extends ProductState {
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  updateStock: (productId: string, newStock: number) => void;
  deleteProduct: (productId: string) => void;
  searchProducts: (term: string) => void;
  filterByCategory: (category: string) => void;
  resetFilters: () => void;
  getLowStockProducts: () => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [...sampleProducts],
  filteredProducts: [...sampleProducts],
  searchTerm: '',
  categoryFilter: '',
  
  setProducts: (products) => {
    set({ 
      products,
      filteredProducts: products
    });
  },
  
  addProduct: (product) => {
    set(state => ({ 
      products: [...state.products, product],
      filteredProducts: [...state.products, product]
    }));
  },
  
  updateProduct: (productId, updates) => {
    set(state => {
      const updatedProducts = state.products.map(product => 
        product.id === productId ? { ...product, ...updates } : product
      );
      
      return { 
        products: updatedProducts,
        filteredProducts: updatedProducts
      };
    });
  },
  
  updateStock: (productId, newStock) => {
    set(state => {
      const updatedProducts = state.products.map(product => 
        product.id === productId ? { ...product, stock: newStock } : product
      );
      
      return { 
        products: updatedProducts,
        filteredProducts: state.filteredProducts.map(product => 
          product.id === productId ? { ...product, stock: newStock } : product
        )
      };
    });
  },
  
  deleteProduct: (productId) => {
    set(state => ({
      products: state.products.filter(product => product.id !== productId),
      filteredProducts: state.filteredProducts.filter(product => product.id !== productId)
    }));
  },
  
  searchProducts: (term) => {
    set(state => {
      const searchTerm = term.toLowerCase();
      const filtered = state.categoryFilter
        ? state.products.filter(p => 
            (p.name.toLowerCase().includes(searchTerm) || 
             p.brand.toLowerCase().includes(searchTerm) || 
             p.barcode === searchTerm) && 
            p.category === state.categoryFilter
          )
        : state.products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.brand.toLowerCase().includes(searchTerm) ||
            p.barcode === searchTerm
          );
      
      return { 
        filteredProducts: filtered,
        searchTerm: term
      };
    });
  },
  
  filterByCategory: (category) => {
    set(state => {
      const filtered = category
        ? state.products.filter(p => 
            p.category === category && 
            (state.searchTerm 
              ? p.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || 
                p.brand.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                p.barcode === state.searchTerm
              : true
            )
          )
        : state.searchTerm
          ? state.products.filter(p => 
              p.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || 
              p.brand.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
              p.barcode === state.searchTerm
            )
          : state.products;
      
      return { 
        filteredProducts: filtered,
        categoryFilter: category
      };
    });
  },
  
  resetFilters: () => {
    set(state => ({ 
      filteredProducts: state.products,
      searchTerm: '',
      categoryFilter: ''
    }));
  },
  
  getLowStockProducts: () => {
    return get().products.filter(product => 
      product.stock <= product.lowStockThreshold
    );
  }
}));