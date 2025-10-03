import React from 'react';
import { Search, Barcode } from 'lucide-react';
import { useProductStore } from '../../store/productStore';

const SearchBar: React.FC = () => {
  const { searchTerm, searchProducts } = useProductStore();
  const [isBarcodeMode, setIsBarcodeMode] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchProducts(e.target.value);
  };
  
  const toggleBarcodeMode = () => {
    setIsBarcodeMode(!isBarcodeMode);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        className="block w-full pl-10 pr-12 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
        placeholder={isBarcodeMode ? "Scan barcode..." : "Search products..."}
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <button
        className={`absolute inset-y-0 right-0 px-3 flex items-center ${isBarcodeMode ? 'text-red-900' : 'text-slate-400'}`}
        onClick={toggleBarcodeMode}
      >
        <Barcode className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;