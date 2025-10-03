import React from 'react';
import { Beer, Wine, GlassWater, CupSoda, CircleDashed } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryMenuProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: '', name: 'All', icon: <CircleDashed className="h-5 w-5" /> },
  { id: 'beer', name: 'Beer', icon: <Beer className="h-5 w-5" /> },
  { id: 'wine', name: 'Wine', icon: <Wine className="h-5 w-5" /> },
  { id: 'spirits', name: 'Spirits', icon: <GlassWater className="h-5 w-5" /> },
  { id: 'mixers', name: 'Mixers', icon: <CupSoda className="h-5 w-5" /> },
];

const CategoryMenu: React.FC<CategoryMenuProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex overflow-x-auto py-2 px-1 mb-4 scrollbar-hide">
      <div className="flex space-x-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium
              ${activeCategory === category.id
                ? 'bg-red-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'}
              border border-slate-200 shadow-sm
            `}
            onClick={() => setActiveCategory(category.id)}
            whileTap={{ scale: 0.97 }}
          >
            {category.icon}
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;