import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Wine } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { sampleUsers } from '../../data/sampleData';

const LoginForm: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const success = login(pin);
      
      if (success) {
        navigate('/');
      } else {
        setError('Invalid PIN. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <motion.div 
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Wine className="h-16 w-16 text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">AlcoPOS System</h1>
        <p className="text-slate-500 mt-2">Enter your PIN to login</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <Input
          type="password"
          label="Employee PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter your PIN"
          fullWidth
          required
          maxLength={4}
          pattern="[0-9]*"
          inputMode="numeric"
          autoFocus
        />
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          isLoading={isLoading}
          className="mt-4"
        >
          Login
        </Button>
        
        <div className="mt-6 text-sm text-slate-500">
          <p className="text-center">Demo PINs:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {sampleUsers.map(user => (
              <div key={user.id} className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                <p className="font-medium">{user.role}</p>
                <p className="text-amber-600">{user.pin}</p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;