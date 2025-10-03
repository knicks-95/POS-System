import React, { useState } from 'react';
import { Edit, Trash2, AlertTriangle, Plus, PackageSearch } from 'lucide-react';
import Button from '../ui/Button';
import { useProductStore } from '../../store/productStore';
import { Product } from '../../types';
import ProductModal from './ProductModal';

const InventoryTable: React.FC = () => {
  const { 
    filteredProducts, 
    searchTerm, 
    categoryFilter, 
    searchProducts, 
    filterByCategory 
  } = useProductStore();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchProducts(e.target.value);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterByCategory(e.target.value);
  };
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <PackageSearch className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
              value={categoryFilter}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="beer">Beer</option>
              <option value="wine">Wine</option>
              <option value="spirits">Spirits</option>
              <option value="mixers">Mixers</option>
              <option value="other">Other</option>
            </select>
            
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                ABV
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No products found. Try adjusting your search or filters.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-slate-100 rounded overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-slate-900">{product.name}</div>
                        <div className="text-sm text-slate-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="capitalize">{product.category}</span>
                    {product.subCategory && (
                      <span className="text-xs text-slate-500 block">
                        {product.subCategory}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-slate-900">${product.price.toFixed(2)}</div>
                    <div className="text-xs text-slate-500">Cost: ${product.cost.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {product.stock <= product.lowStockThreshold ? (
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                          <span className="text-amber-600 font-medium">
                            {product.stock} Low
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-900">{product.stock}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-slate-900">{product.abv}%</span>
                    <span className="text-xs text-slate-500 block">
                      {product.volume}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right space-x-2">
                    <button
                      className="text-slate-400 hover:text-amber-600 transition-colors"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        productToEdit={null}
      />
      
      {editingProduct && (
        <ProductModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          productToEdit={editingProduct}
        />
      )}
    </div>
  );
};

export default InventoryTable;