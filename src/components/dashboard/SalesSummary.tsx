import React from 'react';
import { BarChart3, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import { useOrderStore } from '../../store/orderStore';

const SalesSummary: React.FC = () => {
  const { getTotalSales, orders, getDailySales } = useOrderStore();
  
  const todaySales = getTotalSales('today');
  const weekSales = getTotalSales('week');
  const monthSales = getTotalSales('month');
  
  const completedOrders = orders.filter(order => order.status === 'completed');
  const totalTransactions = completedOrders.length;
  const averageOrderValue = totalTransactions > 0 
    ? completedOrders.reduce((sum, order) => sum + order.total, 0) / totalTransactions
    : 0;
  
  const recentSalesData = getDailySales();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Today's Sales"
          value={`$${todaySales.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5" />}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        
        <SummaryCard
          title="Weekly Sales"
          value={`$${weekSales.toFixed(2)}`}
          icon={<BarChart3 className="h-5 w-5" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        
        <SummaryCard
          title="Total Transactions"
          value={totalTransactions.toString()}
          icon={<ShoppingCart className="h-5 w-5" />}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
        
        <SummaryCard
          title="Average Order Value"
          value={`$${averageOrderValue.toFixed(2)}`}
          icon={<TrendingUp className="h-5 w-5" />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Recent Sales Trend
          </h2>
          <select
            className="rounded-md border border-slate-300 text-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
            defaultValue="7days"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
        
        <div className="h-64">
          <div className="w-full h-full flex items-end space-x-2">
            {recentSalesData.map((day, index) => {
              // Calculate bar height percentage (max 90%)
              const maxSales = Math.max(...recentSalesData.map(d => d.total));
              const heightPercentage = maxSales > 0 
                ? (day.total / maxSales) * 90 
                : 0;
              
              // Format date
              const date = new Date(day.date);
              const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              });
              
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-red-800 hover:bg-red-700 rounded-t-sm transition-all duration-200"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  <div className="pt-2 text-xs text-slate-600 text-center">
                    <div>{formattedDate.split(',')[0]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  iconBg,
  iconColor
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className={`${iconBg} ${iconColor} p-3 rounded-lg mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default SalesSummary;