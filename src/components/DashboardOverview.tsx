import React from 'react';
import { ShoppingCart, Users, RotateCcw, DollarSign, MoreHorizontal, ChevronDown, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = () => {
  // MetricCard component definition
  const MetricCard = ({ title, value, change, changeType, icon: Icon, iconColor, lastMonth }: any) => (
    <Card className="glass-card p-6 hover:bg-card/80 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${iconColor}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
          {value}
        </div>
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
            changeType === 'positive' 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-red-500/20 text-red-400"
          }`}>
            {change}
          </span>
          <span className="text-muted-foreground text-xs">Last month: {lastMonth}</span>
        </div>
      </div>
    </Card>
  );

  // Mock data for metrics matching the reference design
  const metrics = [
    {
      title: 'Total Sales',
      value: '2500',
      change: '+4.4%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
      iconColor: 'from-blue-500 to-blue-600',
      lastMonth: '2345'
    },
    {
      title: 'New Customer',
      value: '110',
      change: '+7.5%',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'from-orange-500 to-orange-600',
      lastMonth: '89'
    },
    {
      title: 'Return Products',
      value: '72',
      change: '-6.6%',
      changeType: 'negative' as const,
      icon: RotateCcw,
      iconColor: 'from-blue-400 to-blue-500',
      lastMonth: '60'
    },
    {
      title: 'Total Revenue',
      value: '$8,220.64',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: DollarSign,
      iconColor: 'from-purple-500 to-purple-600',
      lastMonth: '$620.00'
    }
  ];

  // Performance overview chart data
  const performanceData = [
    { month: 'May', sales: 120, revenue: 2.1 },
    { month: 'Jun', sales: 180, revenue: 3.2 },
    { month: 'Jul', sales: 150, revenue: 2.8 },
    { month: 'Aug', sales: 440, revenue: 4.5 },
    { month: 'Sep', sales: 200, revenue: 3.1 },
    { month: 'Oct', sales: 180, revenue: 2.9 },
    { month: 'Nov', sales: 220, revenue: 3.5 },
    { month: 'Dec', sales: 160, revenue: 2.7 }
  ];

  // Sales overview donut chart data
  const salesData = [
    { name: 'Completed', value: 70.8, color: '#f97316' },
    { name: 'Remaining', value: 29.2, color: '#f3f4f6' }
  ];

  // Recent orders data
  const recentOrders = [
    {
      id: '#878909',
      product: 'Fatos de treino masculino',
      productImage: '/lovable-uploads/ce3a6514-7cbb-4d33-83c6-9ef9f05ded13.png',
      date: '2 Dec 2026',
      customer: 'Oliver John Brown',
      category: 'Shoes, Shirt',
      status: 'Pending',
      items: '2 Items',
      total: '$789.00'
    },
    {
      id: '#878909',
      product: 'Camisa de flor havaiana',
      productImage: '/lovable-uploads/ce3a6514-7cbb-4d33-83c6-9ef9f05ded13.png',
      date: '1 Dec 2026',
      customer: 'Noah James Smith',
      category: 'Sneakers, T-shirt',
      status: 'Complete',
      items: '3 Items',
      total: '$967.00'
    }
  ];


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

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Performance Overview Chart */}
        <div className="xl:col-span-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Card className="glass-card h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground text-lg font-medium">Performance Overview</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                This Week <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="h-[300px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    opacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>Total Sales: 440</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <span>Total Revenue: $4.5k</span>
                  </div>
                </div>
                <span>August 2026</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Overview Donut */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="glass-card h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground text-lg font-medium">Sales Overview</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[300px]">
              <div className="relative w-32 h-32 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">70.8%</div>
                    <div className="text-xs text-muted-foreground">Sales Growth</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-muted-foreground">Number of Sales</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">2,343</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">$30.9k</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground text-lg font-medium">Recent orders</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 w-64 bg-background/50"
                />
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Sort by <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product Info</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order Id</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Items</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <img 
                              src={order.productImage} 
                              alt={order.product}
                              className="w-8 h-8 rounded object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground truncate max-w-[150px]">
                            {order.product}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">{order.id}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{order.date}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{order.customer}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{order.category}</td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={order.status === 'Complete' ? 'default' : 'secondary'}
                          className={order.status === 'Complete' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{order.items}</td>
                      <td className="py-4 px-4 text-sm font-medium text-foreground">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;