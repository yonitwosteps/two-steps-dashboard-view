
import React from 'react';
import { Settings, Users, Clock, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';

const Dashboard = () => {
  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Performance Dashboard</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add Widget
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Sessions"
          value="230,816"
          change="+12.5%"
          changeType="positive"
          icon={Settings}
          iconColor="bg-blue-500/20"
        />
        <MetricCard
          title="Page Load Time"
          value="230,816"
          change="+12.5%"
          changeType="positive"
          icon={Clock}
          iconColor="bg-red-500/20"
        />
        <MetricCard
          title="Page per Sessions"
          value="230,816"
          change="+12.5%"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-purple-500/20"
        />
        <MetricCard
          title="Bounce Rate"
          value="230,816"
          change="+12.5%"
          changeType="positive"
          icon={Users}
          iconColor="bg-yellow-500/20"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <ChartCard
          title="Operating System"
          mainValue="82%"
          type="circular"
          data={[
            { label: 'Windows OS', value: 82, color: '#10B981' },
            { label: 'Other OS', value: 18, color: '#6B7280' }
          ]}
        />
        
        <ChartCard
          title="Browsers"
          mainValue="9,261"
          type="circular"
          data={[
            { label: 'Google Chrome', value: 52, color: '#EF4444' },
            { label: 'Safari', value: 38, color: '#F59E0B' },
            { label: 'Mozilla Firefox', value: 10, color: '#3B82F6' }
          ]}
        />
        
        <ChartCard
          title="Devices"
          mainValue="4,261"
          type="circular"
          data={[
            { label: 'Laptop / PC', value: 52, color: '#8B5CF6' },
            { label: 'Mobile', value: 38, color: '#EF4444' },
            { label: 'Tablet', value: 10, color: '#6366F1' }
          ]}
        />
        
        <ChartCard
          title="Popular Pages"
          mainValue=""
          type="list"
          data={[
            { label: 'Product_Page/Sneakers', value: 2429, color: '#8B5CF6' },
            { label: 'Promo/Summer_sale', value: 2015, color: '#8B5CF6' },
            { label: 'Categories/Women', value: 1833, color: '#8B5CF6' },
            { label: 'Categories/Top_Suit', value: 1641, color: '#8B5CF6' },
            { label: 'Account/Profile', value: 1015, color: '#8B5CF6' }
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
