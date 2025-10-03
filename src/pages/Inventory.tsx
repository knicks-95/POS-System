import React from 'react';
import InventoryTable from '../components/inventory/InventoryTable';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Inventory Management</h2>
      </div>
      
      <InventoryTable />
    </div>
  );
};

export default Inventory;