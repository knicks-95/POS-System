import React, { useState } from 'react';
import ProductGrid from '../components/pos/ProductGrid';
import CategoryMenu from '../components/pos/CategoryMenu';
import SearchBar from '../components/pos/SearchBar';
import Cart from '../components/pos/Cart';

const POS: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('');
  
  return (
    <div className="h-full flex">
      <div className="flex-1 pr-4 overflow-y-auto">
        <SearchBar />
        <CategoryMenu 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <ProductGrid category={activeCategory} />
      </div>
      
      <div className="w-80 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden shrink-0">
        <Cart />
      </div>
    </div>
  );
};

export default POS;