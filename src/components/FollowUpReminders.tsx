
import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock } from 'lucide-react';

const FollowUpReminders = () => {
  // Mock data - replace with real data integration
  const reminders = [
    { id: 1, name: 'John Smith', company: 'TechCorp', priority: 'high', daysOverdue: 2 },
    { id: 2, name: 'Sarah Johnson', company: 'StartupXYZ', priority: 'medium', daysOverdue: 0 },
    { id: 3, name: 'Mike Davis', company: 'Innovation Ltd', priority: 'low', daysOverdue: -1 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border-red-500/40';
      case 'medium': return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/40';
      case 'low': return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/40 hover:border-gray-600/60 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-full flex flex-col group overflow-hidden relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
      
      <CardHeader className="flex-shrink-0 p-4 sm:p-6 relative z-10">
        <CardTitle className="text-sm font-medium text-gray-300 font-dm-sans flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          Follow-up Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-3 p-4 sm:p-6 pt-0 relative z-10">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/80 transition-all duration-200 group">
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-sm font-medium text-white truncate group-hover:text-blue-200 transition-colors duration-200">{reminder.name}</p>
              <p className="text-xs text-gray-400 truncate">{reminder.company}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
              <Badge className={`${getPriorityColor(reminder.priority)} text-xs px-2 py-1 font-medium backdrop-blur-sm border`}>
                {reminder.priority}
              </Badge>
              {reminder.daysOverdue > 0 && (
                <span className="text-xs text-red-300 bg-gradient-to-r from-red-500/20 to-red-600/20 px-2 py-1 rounded-lg whitespace-nowrap border border-red-500/30 font-medium">
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
