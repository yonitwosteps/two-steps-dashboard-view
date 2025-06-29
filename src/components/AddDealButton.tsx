
import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const AddDealButton: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
      <Button 
        variant="ghost" 
        size="sm"
        className="text-gray-400 hover:text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Deal
      </Button>
    </div>
  );
};

export default AddDealButton;
