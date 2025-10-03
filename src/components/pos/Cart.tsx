import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, AlertTriangle, CreditCard, Wallet } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useCartStore } from '../../store/cartStore';
import AgeVerificationModal from './AgeVerificationModal';
import PaymentModal from './PaymentModal';

const Cart: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getSubtotal, 
    getTax, 
    getTotal,
    isAgeVerified,
    customerAge
  } = useCartStore();
  
  const [isVerifyingAge, setIsVerifyingAge] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const handleCheckout = () => {
    if (!isAgeVerified) {
      setIsVerifyingAge(true);
    } else {
      setIsProcessingPayment(true);
    }
  };
  
  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">Current Sale</h2>
      </div>
      
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-slate-400">
          <ShoppingCart className="h-12 w-12 mb-2" />
          <p>Cart is empty</p>
          <p className="text-sm">Add products to begin sale</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                className="flex items-center p-4 border-b border-slate-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-slate-800">{item.product.name}</h3>
                  <p className="text-sm text-slate-500">${item.product.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1 text-slate-400 hover:text-red-900 transition-colors"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  
                  <button
                    className="p-1 text-slate-400 hover:text-red-900 transition-colors"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  
                  <button
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors ml-2"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {!isAgeVerified && items.some(item => item.product.abv > 0) && (
        <Card className="mx-4 mt-4 bg-amber-50 border-amber-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Age verification required</h3>
              <p className="text-sm text-amber-700">
                Alcohol products require age verification before checkout
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => setIsVerifyingAge(true)}
              >
                Verify Age
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {isAgeVerified && customerAge && (
        <div className="px-4 pt-3">
          <p className="text-sm text-green-600 flex items-center">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Customer age verified: {customerAge} years
          </p>
        </div>
      )}
      
      <div className="mt-auto p-4 bg-white border-t border-slate-200">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-slate-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            disabled={items.length === 0}
            icon={<Wallet className="h-5 w-5" />}
            onClick={() => handleCheckout()}
          >
            Cash
          </Button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={items.length === 0}
            icon={<CreditCard className="h-5 w-5" />}
            onClick={() => handleCheckout()}
          >
            Card
          </Button>
        </div>
      </div>
      
      <AgeVerificationModal 
        isOpen={isVerifyingAge} 
        onClose={() => setIsVerifyingAge(false)} 
        onVerified={() => {
          setIsVerifyingAge(false);
          setIsProcessingPayment(true);
        }}
      />
      
      <PaymentModal
        isOpen={isProcessingPayment}
        onClose={() => setIsProcessingPayment(false)}
      />
    </div>
  );
};

// Cart icon component
const ShoppingCart: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.5} 
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
    />
  </svg>
);

export default Cart;