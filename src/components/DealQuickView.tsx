
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  Eye, 
  Edit,
  Clock,
  AlertTriangle,
  User,
  Building,
  Tag,
  Activity,
  FileText,
  Save,
  X
} from 'lucide-react';

interface Deal {
  id: string;
  name: string;
  value: number;
  company: string;
  owner: string;
  stage: string;
  age: number;
  lastContact: string;
  nextTask: string;
  probability: number;
  avatar?: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

interface DealQuickViewProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: Deal) => void;
}

const DealQuickView: React.FC<DealQuickViewProps> = ({ deal, isOpen, onClose, onSave }) => {
  const [editedDeal, setEditedDeal] = useState<Deal | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (deal) {
      setEditedDeal({ ...deal });
    }
  }, [deal]);

  if (!deal || !editedDeal) return null;

  const handleSave = () => {
    onSave(editedDeal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDeal({ ...deal });
    setIsEditing(false);
  };

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'email',
      description: 'Sent proposal email',
      timestamp: '2 hours ago',
      user: 'Sarah Wilson'
    },
    {
      id: '2',
      type: 'call',
      description: 'Discovery call - 45 minutes',
      timestamp: '1 day ago',
      user: 'Sarah Wilson'
    },
    {
      id: '3',
      type: 'meeting',
      description: 'Demo presentation scheduled',
      timestamp: '3 days ago',
      user: 'Sarah Wilson'
    },
    {
      id: '4',
      type: 'note',
      description: 'Client interested in enterprise features',
      timestamp: '1 week ago',
      user: 'Sarah Wilson'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4 text-blue-400" />;
      case 'call': return <Phone className="h-4 w-4 text-green-400" />;
      case 'meeting': return <Calendar className="h-4 w-4 text-purple-400" />;
      case 'note': return <FileText className="h-4 w-4 text-yellow-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] bg-gray-900 border-gray-700 text-white overflow-y-auto">
        <SheetHeader className="space-y-4 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 bg-blue-500/20">
                <AvatarFallback className="text-blue-400 font-medium">
                  {deal.company.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-white text-xl">
                  {isEditing ? (
                    <Input
                      value={editedDeal.name}
                      onChange={(e) => setEditedDeal({ ...editedDeal, name: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    deal.name
                  )}
                </SheetTitle>
                <SheetDescription className="text-gray-400">
                  {deal.company} • {deal.owner}
                </SheetDescription>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm" className="border-gray-700">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="border-gray-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400">Deal Value</p>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedDeal.value}
                        onChange={(e) => setEditedDeal({ ...editedDeal, value: Number(e.target.value) })}
                        className="bg-gray-800 border-gray-700 text-white h-8 text-sm"
                      />
                    ) : (
                      <p className="font-medium text-white">${deal.value.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Age</p>
                    <p className="font-medium text-white">{deal.age} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">Probability</p>
                    <p className="font-medium text-white">{deal.probability}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetHeader>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="details" className="data-[state=active]:bg-gray-700">Details</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700">Activity</TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-gray-700">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* Deal Information */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Deal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Company</label>
                    {isEditing ? (
                      <Input
                        value={editedDeal.company}
                        onChange={(e) => setEditedDeal({ ...editedDeal, company: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    ) : (
                      <p className="text-white">{deal.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Owner</label>
                    <p className="text-white">{deal.owner}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Stage</label>
                    <p className="text-white capitalize">{deal.stage.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Priority</label>
                    <Badge 
                      variant="outline" 
                      className={`${
                        deal.priority === 'high' ? 'border-red-500 text-red-400' :
                        deal.priority === 'medium' ? 'border-yellow-500 text-yellow-400' :
                        'border-green-500 text-green-400'
                      }`}
                    >
                      {deal.priority}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Next Task</label>
                  {isEditing ? (
                    <Input
                      value={editedDeal.nextTask}
                      onChange={(e) => setEditedDeal({ ...editedDeal, nextTask: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    <p className="text-white">{deal.nextTask}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {deal.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Contact
                  </Button>
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-gray-900/50">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{activity.user}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Files & Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-400">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No files uploaded yet</p>
                  <Button variant="outline" className="mt-4 border-gray-700 hover:bg-gray-700">
                    Upload File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default DealQuickView;
