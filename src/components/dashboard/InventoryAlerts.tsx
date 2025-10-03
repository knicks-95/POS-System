import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useProductStore } from '../../store/productStore';

const InventoryAlerts: React.FC = () => {
  const { getLowStockProducts } = useProductStore();
  
  const lowStockProducts = getLowStockProducts();
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Inventory Alerts
        </h2>
        {lowStockProducts.length > 0 && (
          <Button
            variant="outline"
            size="sm"
          >
            Generate Order
          </Button>
        )}
      </div>
      
      {lowStockProducts.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          <p>All inventory levels are good</p>
          <p className="text-sm">No low stock alerts at this time</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.map(product => (
            <div 
              key={product.id}
              className="flex items-center p-3 bg-amber-50 border border-amber-100 rounded-lg"
            >
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
              
              <div className="flex-1">
                <h3 className="font-medium text-slate-800">{product.name}</h3>
                <p className="text-xs text-slate-600">
                  {product.brand} | {product.volume}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-amber-600 font-medium">
                  {product.stock} remaining
                </div>
                <div className="text-xs text-slate-500">
                  Threshold: {product.lowStockThreshold}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default InventoryAlerts;