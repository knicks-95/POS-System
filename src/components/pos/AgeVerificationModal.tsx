import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, ShieldCheck, Camera } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useCartStore } from '../../store/cartStore';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerified
}) => {
  const [age, setAge] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  
  const { verifyAge } = useCartStore();
  
  const handleVerifyAge = () => {
    const ageValue = parseInt(age);
    
    if (isNaN(ageValue)) {
      setError('Please enter a valid age');
      return;
    }
    
    if (ageValue < 21) {
      setError('Customer must be 21 or older to purchase alcohol');
      return;
    }
    
    verifyAge(ageValue);
    onVerified();
  };
  
  const handleScanID = () => {
    setIsScanning(true);
    setError('');
    
    // Simulate ID scanning with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        // Simulate a random valid age between 21 and 65
        const randomAge = Math.floor(Math.random() * 45) + 21;
        setAge(randomAge.toString());
        verifyAge(randomAge);
        setIsScanning(false);
        
        // Give user a moment to see the completed scan
        setTimeout(() => {
          onVerified();
        }, 500);
      }
    }, 200);
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
              className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6"
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
              
              <div className="text-center mb-6">
                <ShieldCheck className="h-10 w-10 text-amber-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-slate-800">Age Verification</h2>
                <p className="text-slate-600 text-sm">
                  Verify the customer is 21+ years old to purchase alcohol
                </p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              {isScanning ? (
                <div className="mb-6">
                  <div className="relative h-40 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                    <Camera className="h-12 w-12 text-slate-400" />
                    <div 
                      className="absolute inset-x-0 bottom-0 h-1 bg-amber-500"
                      style={{ width: `${scanProgress}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-1/2 border-2 border-amber-500 rounded-md border-dashed opacity-70" />
                    </div>
                  </div>
                  <p className="text-center mt-3 text-sm text-slate-600">
                    {scanProgress < 100 ? 'Scanning ID...' : 'Scan Complete!'}
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <Button
                    variant="secondary"
                    fullWidth
                    size="lg"
                    className="mb-4"
                    icon={<Camera className="h-5 w-5" />}
                    onClick={handleScanID}
                  >
                    Scan ID
                  </Button>
                  
                  <div className="text-center text-sm text-slate-500 mb-4">or enter manually</div>
                  
                  <Input
                    label="Customer Age"
                    type="number"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setError('');
                    }}
                    min="1"
                    max="120"
                    placeholder="Enter age"
                    fullWidth
                    required
                  />
                  
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleVerifyAge}
                    disabled={!age}
                  >
                    Verify Age
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-slate-500 text-center">
                By continuing, you confirm that you have verified the customer's age according to local regulations.
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AgeVerificationModal;