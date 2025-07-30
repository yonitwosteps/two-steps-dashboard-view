import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, Users, Target, Activity, DollarSign, Calendar } from 'lucide-react';
import MetricCard from './MetricCard';
import LeadsChart from './LeadsChart';
import RecentLeadsTable from './RecentLeadsTable';
import CircularProgress from './CircularProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const DashboardOverview = () => {
  // Mock data for metrics
  const metrics = [
    {
      title: 'Total Leads',
      value: '2,486',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'Qualified Leads',
      value: '342',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Target,
      iconColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    },
    {
      title: 'Conversion Rate',
      value: '13.8%',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: TrendingUp,
      iconColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      title: 'Pipeline Value',
      value: '$847K',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      iconColor: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'lead_qualified',
      description: 'John Smith qualified for Enterprise tier',
      timestamp: '2 minutes ago',
      avatar: 'JS'
    },
    {
      id: 2,
      type: 'meeting_scheduled',
      description: 'Demo scheduled with TechCorp Inc.',
      timestamp: '15 minutes ago',
      avatar: 'TC'
    },
    {
      id: 3,
      type: 'lead_converted',
      description: 'Sarah Johnson converted to customer',
      timestamp: '1 hour ago',
      avatar: 'SJ'
    },
    {
      id: 4,
      type: 'follow_up',
      description: 'Follow-up call with Innovation Labs',
      timestamp: '2 hours ago',
      avatar: 'IL'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead_qualified':
        return <Target className="w-4 h-4 text-emerald-400" />;
      case 'meeting_scheduled':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'lead_converted':
        return <DollarSign className="w-4 h-4 text-purple-400" />;
      default:
        return <Activity className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <MetricCard {...metric} />
          </div>
        ))}
      </div>

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Lead Performance Chart */}
        <div className="xl:col-span-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <LeadsChart />
        </div>

        {/* Conversion Rate Circle */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg font-medium">Monthly Goal</CardTitle>
              <CardDescription className="text-slate-400">Lead conversion progress</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <CircularProgress 
                percentage={73} 
                color="#10b981" 
                size={140}
                strokeWidth={10}
              />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">73%</p>
                <p className="text-sm text-slate-400">of monthly target</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity Feed and Recent Leads */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Recent Activity Feed */}
        <div className="xl:col-span-1 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg font-medium flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-slate-400">Latest updates from your pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-xs font-medium text-white">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {getActivityIcon(activity.type)}
                        <p className="text-sm text-slate-200 font-medium truncate">
                          {activity.description}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <div className="xl:col-span-3 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <RecentLeadsTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;