import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';

interface ProductGridProps {
  category?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const { filteredProducts, filterByCategory } = useProductStore();
  const { addItem } = useCartStore();
  
  React.useEffect(() => {
    filterByCategory(category || '');
  }, [category, filterByCategory]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <p>No products found</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={() => addItem(product)}
          variants={item}
        />
      ))}
    </motion.div>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  variants?: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, variants }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
      onClick={onAddToCart}
      whileTap={{ scale: 0.97 }}
      variants={variants}
    >
      <div className="relative h-36 overflow-hidden bg-slate-100">
        <img 
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock <= product.lowStockThreshold && (
          <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            Low Stock: {product.stock}
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-slate-900 truncate">{product.name}</h3>
        <p className="text-sm text-slate-500">{product.brand}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-red-900">${product.price.toFixed(2)}</span>
          <span className="text-xs text-slate-600">{product.volume} | {product.abv}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductGrid;