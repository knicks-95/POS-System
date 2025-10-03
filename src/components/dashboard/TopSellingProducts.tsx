import React from 'react';
import Card from '../ui/Card';
import { useOrderStore } from '../../store/orderStore';
import { useProductStore } from '../../store/productStore';

const TopSellingProducts: React.FC = () => {
  const { getTopSellingProducts } = useOrderStore();
  const { products } = useProductStore();
  
  const topProducts = getTopSellingProducts(5);
  
  // Find the corresponding product details
  const topProductsWithDetails = topProducts.map(product => {
    const productDetails = products.find(p => p.id === product.productId);
    
    return {
      ...product,
      imageUrl: productDetails?.imageUrl || '',
      category: productDetails?.category || '',
      brand: productDetails?.brand || ''
    };
  });
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Top Selling Products
        </h2>
      </div>
      
      <div className="space-y-4">
        {topProductsWithDetails.length === 0 ? (
          <p className="text-slate-500 text-center py-6">
            No sales data available yet
          </p>
        ) : (
          topProductsWithDetails.map((product, index) => (
            <div 
              key={product.productId}
              className="flex items-center p-3 rounded-lg hover:bg-slate-50"
            >
              <div className="font-medium text-slate-500 w-6 text-center">
                {index + 1}
              </div>
              
              <div className="h-10 w-10 ml-3 bg-slate-100 rounded overflow-hidden">
                <img 
                  src={product.imageUrl}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-slate-800">{product.productName}</h3>
                <p className="text-xs text-slate-500 capitalize">
                  {product.category} | {product.brand}
                </p>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-slate-800">{product.quantity} sold</div>
                <div className="text-xs text-slate-500">${product.revenue.toFixed(2)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default TopSellingProducts;