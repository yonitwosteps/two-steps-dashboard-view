
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const LeadsChart = () => {
  // Mock data - replace with real data integration
  const weeklyData = [
    { day: 'Mon', leads: 12 },
    { day: 'Tue', leads: 19 },
    { day: 'Wed', leads: 8 },
    { day: 'Thu', leads: 25 },
    { day: 'Fri', leads: 22 },
    { day: 'Sat', leads: 15 },
    { day: 'Sun', leads: 18 },
  ];

  return (
    <Card className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl h-full flex flex-col group">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-sm font-medium text-gray-400 font-dm-sans">Leads This Week</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#60A5FA" 
                strokeWidth={3}
                dot={{ fill: '#60A5FA', strokeWidth: 0, r: 5 }}
                activeDot={{ r: 7, stroke: '#60A5FA', strokeWidth: 2, fill: '#1E40AF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;
