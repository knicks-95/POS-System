import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';
import { useCurrencyStore } from '../../store/currencyStore';

const Header: React.FC = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuthStore();
  const { getLowStockProducts } = useProductStore();
  const { currencies, currentCurrency, setCurrentCurrency } = useCurrencyStore();
  
  const lowStockProducts = getLowStockProducts();
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/pos') return 'Point of Sale';
    if (path === '/inventory') return 'Inventory Management';
    if (path === '/reports') return 'Reports & Analytics';
    if (path === '/tabs') return 'Open Tabs';
    
    return path.split('/').pop()?.charAt(0).toUpperCase() + path.split('/').pop()?.slice(1) || '';
  };
  
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-slate-800">
        {getPageTitle()}
      </h1>
      
      <div className="flex items-center space-x-4">
        <select
          className="rounded-md border border-slate-300 text-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
          value={currentCurrency.code}
          onChange={(e) => {
            const currency = currencies.find(c => c.code === e.target.value);
            if (currency) setCurrentCurrency(currency);
          }}
        >
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.symbol}
            </option>
          ))}
        </select>

        <div className="relative">
          <Bell className="w-6 h-6 text-slate-600 cursor-pointer hover:text-red-800 transition-colors" />
          {lowStockProducts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {lowStockProducts.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{currentUser?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{currentUser?.role}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;