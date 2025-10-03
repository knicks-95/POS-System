import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useOrderStore } from '../store/orderStore';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [timeframe, setTimeframe] = useState('7days');
  
  const { getDailySales, getTopSellingProducts } = useOrderStore();
  
  const salesData = getDailySales();
  const productData = getTopSellingProducts(10);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Reports & Analytics</h2>
        
        <div className="flex items-center space-x-2">
          <select
            className="rounded-md border border-slate-300 text-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="h-4 w-4" />}
          >
            Export
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'sales'
                  ? 'border-red-900 text-red-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('sales')}
            >
              Sales Reports
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'products'
                  ? 'border-red-900 text-red-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Product Performance
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'employees'
                  ? 'border-red-900 text-red-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('employees')}
            >
              Employee Performance
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'sales' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <ReportCard
                  title="Sales Overview"
                  icon={<BarChart3 className="h-5 w-5" />}
                  iconColor="text-blue-600"
                  iconBg="bg-blue-100"
                />
                <ReportCard
                  title="Sales Trends"
                  icon={<LineChart className="h-5 w-5" />}
                  iconColor="text-green-600"
                  iconBg="bg-green-100"
                />
                <ReportCard
                  title="Payment Methods"
                  icon={<PieChart className="h-5 w-5" />}
                  iconColor="text-purple-600"
                  iconBg="bg-purple-100"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Daily Sales
                </h3>
                <div className="bg-slate-50 p-4 rounded-lg h-80 flex items-end space-x-2">
                  {salesData.map((day) => {
                    const maxSales = Math.max(...salesData.map(d => d.total));
                    const heightPercentage = maxSales > 0 
                      ? (day.total / maxSales) * 90 
                      : 0;
                    
                    return (
                      <div key={day.date} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-red-800 hover:bg-red-700 rounded-t-sm transition-all duration-200"
                          style={{ height: `${heightPercentage}%` }}
                        ></div>
                        <div className="pt-2 text-xs text-slate-600 text-center">
                          <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          <div>${day.total.toFixed(0)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Sales Summary
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Total Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Transactions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Items Sold
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Average Order
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {salesData.map((day) => (
                        <tr key={day.date} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {new Date(day.date).toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            ${day.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {day.transactions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {day.itemsSold}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            ${(day.total / day.transactions).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Top Selling Products
                </h3>
                <div className="bg-slate-50 p-4 rounded-lg h-80 flex items-end space-x-2">
                  {productData.map((product) => {
                    const maxQuantity = Math.max(...productData.map(p => p.quantity));
                    const heightPercentage = maxQuantity > 0 
                      ? (product.quantity / maxQuantity) * 90 
                      : 0;
                    
                    return (
                      <div key={product.productId} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-amber-600 hover:bg-amber-500 rounded-t-sm transition-all duration-200"
                          style={{ height: `${heightPercentage}%` }}
                        ></div>
                        <div className="pt-2 text-xs text-slate-600 text-center overflow-hidden">
                          <div className="truncate max-w-[100px]">{product.productName}</div>
                          <div>{product.quantity} units</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Product Sales Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Quantity Sold
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          % of Total Sales
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {productData.map((product) => {
                        const totalRevenue = productData.reduce((sum, p) => sum + p.revenue, 0);
                        const percentage = totalRevenue > 0 
                          ? (product.revenue / totalRevenue) * 100
                          : 0;
                        
                        return (
                          <tr key={product.productId} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {product.productName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {product.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              ${product.revenue.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {percentage.toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'employees' && (
            <div className="text-center py-12 text-slate-500">
              <p>Employee performance reporting coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ReportCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  icon,
  iconColor,
  iconBg
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center">
        <div className={`${iconBg} ${iconColor} p-3 rounded-lg mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">View Report</p>
        </div>
      </div>
    </Card>
  );
};

export default Reports;