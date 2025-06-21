
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const TeamActivity = () => {
  // Mock data - replace with real data integration
  const teamMembers = [
    { id: 1, name: 'Alex Thompson', leadsToday: 8, status: 'active' },
    { id: 2, name: 'Emma Wilson', leadsToday: 12, status: 'active' },
    { id: 3, name: 'David Chen', leadsToday: 6, status: 'idle' },
    { id: 4, name: 'Lisa Rodriguez', leadsToday: 15, status: 'active' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-yellow-500';
  };

  return (
    <Card className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl h-full flex flex-col group">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-sm font-medium text-gray-400 font-dm-sans">Team Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)} shadow-lg`} />
              <div>
                <p className="text-sm font-medium text-white">{member.name}</p>
                <p className="text-xs text-gray-400">
                  {member.leadsToday} leads today
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-400">{member.leadsToday}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamActivity;
