
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  Clock,
  AlertTriangle
} from 'lucide-react';
import { type Deal } from '../hooks/useDealsStore';

interface EnhancedDealCardProps {
  deal: Deal;
  onClick: () => void;
  isSelected: boolean;
  isDragging?: boolean;
}

const EnhancedDealCard: React.FC<EnhancedDealCardProps> = ({ 
  deal, 
  onClick, 
  isSelected,
  isDragging = false
}) => {

  const getAgeColor = (age: number) => {
    if (age <= 7) return 'text-green-400';
    if (age <= 14) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card 
      className={`bg-gray-800/80 border-gray-700/50 hover:border-gray-600/50 cursor-pointer transition-all duration-200 hover:shadow-xl group ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-500/50' : ''
      } ${
        isDragging ? 'shadow-2xl z-50 opacity-90' : 'hover:scale-[1.02]'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header with company avatar and priority */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-blue-500/20">
              <AvatarFallback className="text-blue-400 font-medium text-sm">
                {deal.company.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-white text-sm leading-tight group-hover:text-blue-300 transition-colors">
                {deal.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{deal.company}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs px-2 py-1 ${getPriorityColor(deal.priority)}`}
          >
            {deal.priority}
          </Badge>
        </div>

        {/* Deal value */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <span className="text-lg font-bold text-white">
              ${deal.value.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            {deal.probability}% probability
          </div>
        </div>

        {/* Deal metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Clock className={`h-3 w-3 ${getAgeColor(deal.age)}`} />
            <span className="text-gray-300">{deal.age} days old</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-blue-400" />
            <span className="text-gray-300">{deal.lastContact}</span>
          </div>
        </div>

        {/* Next task */}
        <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-md">
          <AlertTriangle className="h-3 w-3 text-yellow-400 flex-shrink-0" />
          <span className="text-xs text-gray-300 truncate">{deal.nextTask}</span>
        </div>

        {/* Tags */}
        {deal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {deal.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 hover:bg-gray-700">
                {tag}
              </Badge>
            ))}
            {deal.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                +{deal.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Owner */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6 bg-purple-500/20">
              <AvatarFallback className="text-purple-400 text-xs">
                {deal.owner.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-400">{deal.owner}</span>
          </div>
          
          {/* Quick actions - shown on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                // Handle quick call
              }}
            >
              <Phone className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                // Handle quick email
              }}
            >
              <Mail className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedDealCard;
