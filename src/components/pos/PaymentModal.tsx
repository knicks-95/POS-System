import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, CreditCard, Smartphone, Check, Clock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useCartStore } from '../../store/cartStore';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentStep = 'method' | 'cash' | 'card' | 'mobile' | 'success' | 'tab';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<PaymentStep>('method');
  const [cashReceived, setCashReceived] = useState<string>('');
  const [tipAmount, setTipAmount] = useState<string>('');
  const [tabName, setTabName] = useState<string>('');
  
  const { getTotal, processPayment, createTab, setTabName: setCartTabName } = useCartStore();
  
  const total = getTotal();
  const change = parseFloat(cashReceived) - total;
  const tipValue = tipAmount ? parseFloat(tipAmount) : 0;
  
  const handleCashPayment = () => {
    processPayment('cash', tipValue);
    setStep('success');
  };
  
  const handleCardPayment = () => {
    processPayment('credit', tipValue);
    setStep('success');
  };
  
  const handleMobilePayment = () => {
    processPayment('mobile', tipValue);
    setStep('success');
  };
  
  const handleCreateTab = () => {
    setCartTabName(tabName);
    createTab();
    setStep('success');
  };
  
  const resetAndClose = () => {
    setStep('method');
    setCashReceived('');
    setTipAmount('');
    setTabName('');
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
              onClick={resetAndClose}
            />
            
            <motion.div
              className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                onClick={resetAndClose}
              >
                <X className="h-5 w-5" />
              </button>
              
              {step === 'method' && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 mb-6">
                    Payment Method
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<DollarSign className="h-5 w-5" />}
                      onClick={() => setStep('cash')}
                    >
                      Cash
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<CreditCard className="h-5 w-5" />}
                      onClick={() => setStep('card')}
                    >
                      Card
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<Smartphone className="h-5 w-5" />}
                      onClick={() => setStep('mobile')}
                    >
                      Mobile
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<Clock className="h-5 w-5" />}
                      onClick={() => setStep('tab')}
                    >
                      Open Tab
                    </Button>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg text-slate-800">
                      <span>Total Due</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
              
              {step === 'cash' && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 mb-6">
                    Cash Payment
                  </h2>
                  
                  <Input
                    label="Cash Received"
                    type="number"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    fullWidth
                    placeholder="0.00"
                    min={total}
                    step="0.01"
                  />
                  
                  <Input
                    label="Tip Amount (Optional)"
                    type="number"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    fullWidth
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  
                  {parseFloat(cashReceived) >= total && (
                    <div className="mb-4 p-3 bg-green-50 rounded-md">
                      <div className="flex justify-between text-green-800">
                        <span>Change due:</span>
                        <span className="font-bold">${change.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg text-slate-800 mb-4">
                      <span>Total Due</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    <Button
                      variant="primary"
                      fullWidth
                      size="lg"
                      disabled={parseFloat(cashReceived) < total}
                      onClick={handleCashPayment}
                    >
                      Complete Payment
                    </Button>
                  </div>
                </>
              )}
              
              {step === 'card' && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 mb-6">
                    Card Payment
                  </h2>
                  
                  <div className="mb-6 p-4 bg-slate-50 rounded-md text-center">
                    <CreditCard className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-700">Process card payment on terminal</p>
                  </div>
                  
                  <Input
                    label="Tip Amount (Optional)"
                    type="number"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    fullWidth
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg text-slate-800 mb-4">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    {tipValue > 0 && (
                      <div className="flex justify-between text-lg text-slate-800 mb-4">
                        <span>Tip</span>
                        <span>${tipValue.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg text-slate-800 mb-4">
                      <span>Total</span>
                      <span>${(total + tipValue).toFixed(2)}</span>
                    </div>
                    
                    <Button
                      variant="primary"
                      fullWidth
                      size="lg"
                      onClick={handleCardPayment}
                    >
                      Complete Payment
                    </Button>
                  </div>
                </>
              )}
              
              {step === 'mobile' && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 mb-6">
                    Mobile Payment
                  </h2>
                  
                  <div className="mb-6 p-4 bg-slate-50 rounded-md text-center">
                    <Smartphone className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-700">Process mobile payment via app</p>
                  </div>
                  
                  <Input
                    label="Tip Amount (Optional)"
                    type="number"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    fullWidth
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg text-slate-800 mb-4">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    {tipValue > 0 && (
                      <div className="flex justify-between text-lg text-slate-800 mb-4">
                        <span>Tip</span>
                        <span>${tipValue.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg text-slate-800 mb-4">
                      <span>Total</span>
                      <span>${(total + tipValue).toFixed(2)}</span>
                    </div>
                    
                    <Button
                      variant="primary"
                      fullWidth
                      size="lg"
                      onClick={handleMobilePayment}
                    >
                      Complete Payment
                    </Button>
                  </div>
                </>
              )}
              
              {step === 'tab' && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 mb-6">
                    Open a Tab
                  </h2>
                  
                  <Input
                    label="Customer Name or Tab Reference"
                    type="text"
                    value={tabName}
                    onChange={(e) => setTabName(e.target.value)}
                    fullWidth
                    placeholder="e.g. John Smith or Table 5"
                    required
                  />
                  
                  <div className="mb-4 p-3 bg-amber-50 rounded-md">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        The tab will remain open until closed. You can manage all open tabs from the Tabs section.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg text-slate-800 mb-4">
                      <span>Tab Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    <Button
                      variant="primary"
                      fullWidth
                      size="lg"
                      disabled={!tabName}
                      onClick={handleCreateTab}
                    >
                      Create Tab
                    </Button>
                  </div>
                </>
              )}
              
              {step === 'success' && (
                <>
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Payment Successful
                    </h2>
                    <p className="text-slate-600 mt-1">
                      {tabName ? 'Tab created successfully' : 'Transaction has been completed'}
                    </p>
                  </div>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    onClick={resetAndClose}
                  >
                    Done
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;