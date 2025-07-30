import React from 'react';
import { TrendingUp, Users, Target, DollarSign, Clock, Activity, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react';
import MetricCard from './MetricCard';
import LeadsChart from './LeadsChart';
import LeadSourcesChart from './LeadSourcesChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import CircularProgress from './CircularProgress';

const AnalyticsDashboard = () => {
  // Enhanced analytics metrics
  const primaryMetrics = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+18.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      iconColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    },
    {
      title: 'Lead Velocity',
      value: '847',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      iconColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'Conversion Rate',
      value: '13.8%',
      change: '-2.4%',
      changeType: 'negative' as const,
      icon: Target,
      iconColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      title: 'Avg. Deal Size',
      value: '$127K',
      change: '+7.2%',
      changeType: 'positive' as const,
      icon: BarChart3,
      iconColor: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ];

  const secondaryMetrics = [
    {
      title: 'Active Leads',
      value: '1,247',
      change: '+5.3%',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    },
    {
      title: 'Avg. Response Time',
      value: '2.4h',
      change: '-12.7%',
      changeType: 'positive' as const,
      icon: Clock,
      iconColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    }
  ];

  // Performance indicators data
  const performanceData = [
    { label: 'Q1 Target', value: 85, color: '#10b981' },
    { label: 'Q2 Forecast', value: 92, color: '#3b82f6' },
    { label: 'Team Performance', value: 78, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-8">
      {/* Primary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {primaryMetrics.map((metric, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <MetricCard {...metric} />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Lead Performance Chart */}
        <div className="xl:col-span-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <LeadsChart />
        </div>

        {/* Lead Sources */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <LeadSourcesChart />
        </div>
      </div>

      {/* Secondary Metrics and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Secondary Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {secondaryMetrics.map((metric, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${0.7 + index * 0.1}s` }}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Performance Indicators */}
        <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg font-medium flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Performance Indicators
              </CardTitle>
              <CardDescription className="text-slate-400">Key performance metrics overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-200">{item.label}</span>
                    <span className="text-sm font-bold text-white">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}40`
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Performance Summary */}
      <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
        <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-200 text-lg font-medium">Team Performance Summary</CardTitle>
            <CardDescription className="text-slate-400">Individual and team metrics for this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Performer */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Sarah Chen</p>
                  <p className="text-sm text-slate-400">Top Performer</p>
                  <p className="text-lg font-semibold text-emerald-400">$847K Revenue</p>
                </div>
              </div>

              {/* Team Average */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">6.2/10</p>
                  <p className="text-sm text-slate-400">Team Average</p>
                  <p className="text-lg font-semibold text-blue-400">Performance Score</p>
                </div>
              </div>

              {/* Goal Achievement */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">87%</p>
                  <p className="text-sm text-slate-400">Goal Achievement</p>
                  <p className="text-lg font-semibold text-purple-400">Quarterly Target</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;