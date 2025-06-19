
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
    <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 rounded-xl shadow-lg h-[300px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-sm font-medium text-slate-300">Leads This Week</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={false}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;
