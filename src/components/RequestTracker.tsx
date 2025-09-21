import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Pause,
  RotateCcw,
  Eye,
  MessageSquare,
  Phone,
  Calendar,
  User,
  Camera,
  FileText,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface RequestStatus {
  id: string;
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed' | 'reopened';
  title: string;
  description: string;
  location: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  submittedDate: string;
  estimatedResolution: string;
  assignedTo?: string;
  department: string;
  photos: string[];
  updates: StatusUpdate[];
  trackingNumber: string;
}

interface StatusUpdate {
  id: string;
  status: string;
  message: string;
  timestamp: string;
  author: string;
  authorRole: string;
  photos?: string[];
}

interface RequestTrackerProps {
  requests?: RequestStatus[];
  onRequestSelect?: (request: RequestStatus) => void;
  showStats?: boolean;
}

const mockRequests: RequestStatus[] = [
  {
    id: '1',
    status: 'in-progress',
    title: 'Pothole on Main Street',
    description: 'Large pothole near the intersection of Main St and Oak Ave',
    location: '123 Main Street, Fort Wayne, IN',
    category: 'Streets',
    priority: 'high',
    submittedDate: '2024-01-15T10:30:00Z',
    estimatedResolution: '2024-01-18T17:00:00Z',
    assignedTo: 'Sarah Johnson',
    department: 'Public Works',
    photos: ['/api/placeholder/400/300'],
    trackingNumber: 'FW-2024-001234',
    updates: [
      {
        id: '1',
        status: 'submitted',
        message: 'Request submitted successfully',
        timestamp: '2024-01-15T10:30:00Z',
        author: 'System',
        authorRole: 'Automated'
      },
      {
        id: '2',
        status: 'in-progress',
        message: 'Request assigned to Public Works department. Crew will inspect within 24 hours.',
        timestamp: '2024-01-15T14:20:00Z',
        author: 'Mike Chen',
        authorRole: 'Department Supervisor'
      },
      {
        id: '3',
        status: 'in-progress',
        message: 'Site inspection completed. Repair scheduled for tomorrow morning.',
        timestamp: '2024-01-16T09:15:00Z',
        author: 'Sarah Johnson',
        authorRole: 'Field Technician',
        photos: ['/api/placeholder/400/300']
      }
    ]
  },
  {
    id: '2',
    status: 'resolved',
    title: 'Missed Trash Pickup',
    description: 'Trash was not collected on scheduled pickup day',
    location: '456 Oak Avenue, Fort Wayne, IN',
    category: 'Sanitation',
    priority: 'medium',
    submittedDate: '2024-01-14T08:00:00Z',
    estimatedResolution: '2024-01-15T17:00:00Z',
    assignedTo: 'John Smith',
    department: 'Solid Waste',
    photos: [],
    trackingNumber: 'FW-2024-001235',
    updates: [
      {
        id: '1',
        status: 'submitted',
        message: 'Request submitted successfully',
        timestamp: '2024-01-14T08:00:00Z',
        author: 'System',
        authorRole: 'Automated'
      },
      {
        id: '2',
        status: 'in-progress',
        message: 'Request assigned to Solid Waste department. Collection scheduled for next business day.',
        timestamp: '2024-01-14T10:30:00Z',
        author: 'Lisa Rodriguez',
        authorRole: 'Department Supervisor'
      },
      {
        id: '3',
        status: 'resolved',
        message: 'Trash collected successfully. Thank you for your patience.',
        timestamp: '2024-01-15T11:45:00Z',
        author: 'John Smith',
        authorRole: 'Collection Driver'
      }
    ]
  }
];

export default function RequestTracker({ 
  requests = mockRequests, 
  onRequestSelect,
  showStats = true 
}: RequestTrackerProps) {
  const [selectedRequest, setSelectedRequest] = useState<RequestStatus | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const filteredRequests = requests.filter(request => {
    switch (filter) {
      case 'active':
        return ['submitted', 'in-progress', 'reopened'].includes(request.status);
      case 'resolved':
        return ['resolved', 'closed'].includes(request.status);
      default:
        return true;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Pause className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      case 'reopened': return <RotateCcw className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-amber-100 text-amber-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'reopened': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (request: RequestStatus): number => {
    switch (request.status) {
      case 'submitted': return 25;
      case 'in-progress': return 75;
      case 'resolved': return 100;
      case 'closed': return 100;
      case 'reopened': return 50;
      default: return 0;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(dateString);
  };

  const stats = {
    total: requests.length,
    active: requests.filter(r => ['submitted', 'in-progress', 'reopened'].includes(r.status)).length,
    resolved: requests.filter(r => ['resolved', 'closed'].includes(r.status)).length,
    avgResolutionTime: '2.3 days'
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.resolved}</p>
                  <p className="text-sm text-gray-600">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.avgResolutionTime}</p>
                  <p className="text-sm text-gray-600">Avg. Resolution</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {filteredRequests.map((request) => (
            <Card 
              key={request.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedRequest(request);
                onRequestSelect?.(request);
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{request.title}</h3>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status.replace('-', ' ')}</span>
                      </Badge>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority} priority
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{request.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Submitted {getTimeAgo(request.submittedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{request.trackingNumber}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {request.photos.length > 0 && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Camera className="h-4 w-4" />
                        <span>{request.photos.length}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{calculateProgress(request)}%</span>
                  </div>
                  <Progress value={calculateProgress(request)} className="h-2" />
                </div>

                {/* Latest Update */}
                {request.updates.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getStatusIcon(request.updates[request.updates.length - 1].status)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {request.updates[request.updates.length - 1].message}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {request.updates[request.updates.length - 1].author}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {getTimeAgo(request.updates[request.updates.length - 1].timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Request Details Modal/View */}
      {selectedRequest && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <span>{selectedRequest.title}</span>
                <Badge className={getStatusColor(selectedRequest.status)}>
                  {getStatusIcon(selectedRequest.status)}
                  <span className="ml-1 capitalize">{selectedRequest.status.replace('-', ' ')}</span>
                </Badge>
              </CardTitle>
              <Button variant="ghost" onClick={() => setSelectedRequest(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {/* Request Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tracking Number:</span>
                      <span className="font-medium">{selectedRequest.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedRequest.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{selectedRequest.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <Badge className={getPriorityColor(selectedRequest.priority)}>
                        {selectedRequest.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Assignment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assigned To:</span>
                      <span className="font-medium">{selectedRequest.assignedTo || 'Not assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium">{formatDate(selectedRequest.submittedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Resolution:</span>
                      <span className="font-medium">{formatDate(selectedRequest.estimatedResolution)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Status Timeline</h4>
                <div className="space-y-4">
                  {selectedRequest.updates.map((update, index) => (
                    <div key={update.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          index === selectedRequest.updates.length - 1 
                            ? "bg-blue-100 text-blue-600" 
                            : "bg-gray-100 text-gray-600"
                        )}>
                          {getStatusIcon(update.status)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-sm">{update.status.replace('-', ' ')}</h5>
                          <span className="text-xs text-gray-500">
                            {getTimeAgo(update.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{update.message}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <User className="h-3 w-3" />
                          <span>{update.author}</span>
                          <span>•</span>
                          <span>{update.authorRole}</span>
                        </div>
                        {update.photos && update.photos.length > 0 && (
                          <div className="mt-2 flex space-x-2">
                            {update.photos.map((photo, photoIndex) => (
                              <img
                                key={photoIndex}
                                src={photo}
                                alt={`Update ${index + 1} photo ${photoIndex + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Department
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reopen Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
