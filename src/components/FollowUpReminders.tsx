
import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const FollowUpReminders = () => {
  // Mock data - replace with real data integration
  const reminders = [
    { id: 1, name: 'John Smith', company: 'TechCorp', priority: 'high', daysOverdue: 2 },
    { id: 2, name: 'Sarah Johnson', company: 'StartupXYZ', priority: 'medium', daysOverdue: 0 },
    { id: 3, name: 'Mike Davis', company: 'Innovation Ltd', priority: 'low', daysOverdue: -1 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  return (
    <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 rounded-xl shadow-lg h-[300px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-sm font-medium text-slate-300">Follow-up Reminders</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{reminder.name}</p>
              <p className="text-xs text-slate-400 truncate">{reminder.company}</p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Badge className={getPriorityColor(reminder.priority)}>
                {reminder.priority}
              </Badge>
              {reminder.daysOverdue > 0 && (
                <span className="text-xs text-red-400">
                  {reminder.daysOverdue}d overdue
                </span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FollowUpReminders;
