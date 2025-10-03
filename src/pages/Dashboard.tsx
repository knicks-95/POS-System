import React from 'react';
import SalesSummary from '../components/dashboard/SalesSummary';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import InventoryAlerts from '../components/dashboard/InventoryAlerts';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <SalesSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSellingProducts />
        <InventoryAlerts />
      </div>
      
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;