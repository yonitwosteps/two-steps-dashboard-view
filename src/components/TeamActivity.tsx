
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
    <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-300">Team Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
              <div>
                <p className="text-sm font-medium text-white">{member.name}</p>
                <p className="text-xs text-slate-400">
                  {member.leadsToday} leads today
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-blue-400">{member.leadsToday}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamActivity;
