import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Tabs from './pages/Tabs';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pos" element={<POS />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="tabs" element={<Tabs />} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="staff" element={<div>Staff Management Page</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;