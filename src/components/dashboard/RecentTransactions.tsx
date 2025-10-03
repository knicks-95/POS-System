import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';
import { useOrderStore } from '../../store/orderStore';
import { format } from 'date-fns';

const RecentTransactions: React.FC = () => {
  const { getRecentOrders } = useOrderStore();
  
  const recentOrders = getRecentOrders(5);
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Transactions
        </h2>
        <Button>View All</Button>
      </div>
      
      <div className="space-y-4">
        {recentOrders.length === 0 ? (
          <p className="text-slate-500 text-center py-6">
            No recent transactions
          </p>
        ) : (
          recentOrders.map(order => (
            <div 
              key={order.id}
              className="flex items-center p-3 rounded-lg hover:bg-slate-50"
            >
              <div className={`
                h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
                ${order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}
              `}>
                {order.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-slate-800">
                    {order.status === 'open-tab' ? (
                      <span>Tab: {order.tabName}</span>
                    ) : (
                      <span>Order #{order.id.slice(0, 8)}</span>
                    )}
                  </h3>
                  <span className="font-medium text-slate-800">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-xs text-slate-500">
                  <span>
                    {format(new Date(order.timestamp), 'MMM d, h:mm a')}
                  </span>
                  <span className="capitalize">
                    {order.status === 'completed' ? order.paymentMethod : 'Open Tab'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="text-sm font-medium text-red-900 hover:text-red-800">
      {children}
    </button>
  );
};

export default RecentTransactions;