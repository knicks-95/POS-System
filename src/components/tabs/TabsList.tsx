import React from 'react';
import { Clock, CreditCard, X, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useOrderStore } from '../../store/orderStore';
import { format } from 'date-fns';

const TabsList: React.FC = () => {
  const { openTabs, closeTab } = useOrderStore();
  
  const [closingTabId, setClosingTabId] = React.useState<string | null>(null);
  
  const handleCloseTab = (tabId: string) => {
    setClosingTabId(tabId);
  };
  
  const handlePayment = (paymentMethod: 'cash' | 'credit' | 'debit' | 'mobile') => {
    if (closingTabId) {
      closeTab(closingTabId, paymentMethod);
      setClosingTabId(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Active Tabs</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {openTabs.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <p className="text-lg font-medium">No open tabs</p>
            <p className="text-sm">Open a tab from the Point of Sale screen</p>
          </div>
        ) : (
          openTabs.map(tab => (
            <Card key={tab.id} className="overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-800">
                    {tab.tabName}
                  </h3>
                  <span className="text-sm text-slate-500">
                    {format(new Date(tab.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3 mb-4">
                  {tab.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity} x {item.product.name}
                      </span>
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-100 pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span>${tab.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tax</span>
                    <span>${tab.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${tab.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-200">
                {closingTabId === tab.id ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<DollarSign className="h-4 w-4" />}
                        onClick={() => handlePayment('cash')}
                      >
                        Cash
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<CreditCard className="h-4 w-4" />}
                        onClick={() => handlePayment('credit')}
                      >
                        Card
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setClosingTabId(null)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => handleCloseTab(tab.id)}
                  >
                    Close Tab
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TabsList;