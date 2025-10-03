import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  PackageSearch, 
  BarChart3, 
  GlassWater,
  Users,
  Settings,
  Wine
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar: React.FC = () => {
  const { currentUser } = useAuthStore();
  
  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard />, roles: ['admin', 'manager', 'cashier', 'bartender'] },
    { path: '/pos', label: 'Point of Sale', icon: <ShoppingCart />, roles: ['admin', 'manager', 'cashier', 'bartender'] },
    { path: '/inventory', label: 'Inventory', icon: <PackageSearch />, roles: ['admin', 'manager'] },
    { path: '/reports', label: 'Reports', icon: <BarChart3 />, roles: ['admin', 'manager'] },
    { path: '/tabs', label: 'Open Tabs', icon: <GlassWater />, roles: ['admin', 'manager', 'bartender'] },
    { path: '/staff', label: 'Staff', icon: <Users />, roles: ['admin'] },
    { path: '/settings', label: 'Settings', icon: <Settings />, roles: ['admin'] },
  ];
  
  // Filter nav items based on user role
  const filteredItems = navigationItems.filter(
    item => currentUser && item.roles.includes(currentUser.role)
  );
  
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Wine className="h-8 w-8 text-amber-500" />
          <h1 className="text-xl font-bold">AlcoPOS</h1>
        </div>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {filteredItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-md
                  ${isActive 
                    ? 'bg-red-900 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'}
                  transition-colors duration-200
                `}
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">AlcoPOS System v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;