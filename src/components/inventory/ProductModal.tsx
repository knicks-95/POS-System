import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImagePlus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useProductStore } from '../../store/productStore';
import { Product } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
}

const initialProductState: Omit<Product, 'id'> = {
  name: '',
  category: 'beer',
  price: 0,
  cost: 0,
  stock: 0,
  lowStockThreshold: 5,
  imageUrl: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg',
  description: '',
  abv: 0,
  volume: '',
  brand: '',
};

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialProductState);
  const { addProduct, updateProduct } = useProductStore();
  
  useEffect(() => {
    if (productToEdit) {
      setFormData({ ...productToEdit });
    } else {
      setFormData(initialProductState);
    }
  }, [productToEdit]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Convert number inputs to numbers
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (productToEdit) {
      updateProduct(productToEdit.id, formData);
    } else {
      addProduct({
        id: uuidv4(),
        ...formData,
      });
    }
    
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={onClose}
            />
            
            <motion.div
              className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                {productToEdit ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      label="Product Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-md border border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        required
                      >
                        <option value="beer">Beer</option>
                        <option value="wine">Wine</option>
                        <option value="spirits">Spirits</option>
                        <option value="mixers">Mixers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <Input
                      label="Sub-Category (Optional)"
                      name="subCategory"
                      value={formData.subCategory || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Retail Price ($)"
                        name="price"
                        type="number"
                        value={formData.price.toString()}
                        onChange={handleChange}
                        fullWidth
                        min="0"
                        step="0.01"
                        required
                      />
                      
                      <Input
                        label="Cost Price ($)"
                        name="cost"
                        type="number"
                        value={formData.cost.toString()}
                        onChange={handleChange}
                        fullWidth
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Current Stock"
                        name="stock"
                        type="number"
                        value={formData.stock.toString()}
                        onChange={handleChange}
                        fullWidth
                        min="0"
                        required
                      />
                      
                      <Input
                        label="Low Stock Threshold"
                        name="lowStockThreshold"
                        type="number"
                        value={formData.lowStockThreshold.toString()}
                        onChange={handleChange}
                        fullWidth
                        min="0"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="ABV (%)"
                        name="abv"
                        type="number"
                        value={formData.abv.toString()}
                        onChange={handleChange}
                        fullWidth
                        min="0"
                        max="100"
                        step="0.1"
                        required
                      />
                      
                      <Input
                        label="Volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        fullWidth
                        placeholder="e.g. 750ml"
                        required
                      />
                    </div>
                    
                    <Input
                      label="Barcode (Optional)"
                      name="barcode"
                      value={formData.barcode || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Product Image URL
                      </label>
                      <div className="flex space-x-2">
                        <input
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                          className="flex-1 rounded-md border border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                          placeholder="https://..."
                          required
                        />
                        <button
                          type="button"
                          className="p-2 bg-slate-100 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-200"
                        >
                          <ImagePlus className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="mt-2 p-2 border border-slate-200 rounded-md">
                        <div className="h-20 bg-slate-100 rounded overflow-hidden">
                          {formData.imageUrl && (
                            <img 
                              src={formData.imageUrl}
                              alt="Product preview"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg';
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-md border border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-4 mt-6 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    {productToEdit ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;