
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
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Card className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl h-full flex flex-col group">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-sm font-medium text-gray-400 font-dm-sans">Follow-up Reminders</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{reminder.name}</p>
              <p className="text-xs text-gray-400 truncate">{reminder.company}</p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Badge className={getPriorityColor(reminder.priority)}>
                {reminder.priority}
              </Badge>
              {reminder.daysOverdue > 0 && (
                <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
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
