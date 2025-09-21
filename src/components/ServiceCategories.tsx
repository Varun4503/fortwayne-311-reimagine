import { useState } from 'react';
import { 
  Trash2, 
  MapPin, 
  Shield, 
  Building, 
  Car, 
  Lightbulb, 
  TreePine, 
  FileText,
  Clock,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  services: Service[];
  priority: 'high' | 'medium' | 'low';
  avgResponseTime: string;
  requestCount: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  avgResponseTime: string;
  isPopular?: boolean;
  isTrending?: boolean;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'sanitation',
    name: 'Trash & Recycling',
    description: 'Waste collection and recycling services',
    icon: <Trash2 className="h-6 w-6" />,
    color: 'bg-green-500',
    priority: 'high',
    avgResponseTime: '1-2 days',
    requestCount: 1247,
    services: [
      {
        id: 'missed-pickup',
        name: 'Missed Trash Pickup',
        description: 'Report missed garbage or recycling collection',
        icon: <Trash2 className="h-5 w-5" />,
        avgResponseTime: 'Same day',
        isPopular: true
      },
      {
        id: 'bulk-pickup',
        name: 'Bulk Item Collection',
        description: 'Schedule pickup for large items',
        icon: <Trash2 className="h-5 w-5" />,
        avgResponseTime: '3-5 days',
        isTrending: true
      },
      {
        id: 'cart-maintenance',
        name: 'Cart Maintenance',
        description: 'Repair or replace damaged trash carts',
        icon: <Trash2 className="h-5 w-5" />,
        avgResponseTime: '2-3 days'
      }
    ]
  },
  {
    id: 'streets',
    name: 'Streets & Infrastructure',
    description: 'Road maintenance and traffic infrastructure',
    icon: <MapPin className="h-6 w-6" />,
    color: 'bg-blue-500',
    priority: 'high',
    avgResponseTime: '2-3 days',
    requestCount: 892,
    services: [
      {
        id: 'pothole',
        name: 'Pothole Repair',
        description: 'Report potholes and road damage',
        icon: <MapPin className="h-5 w-5" />,
        avgResponseTime: '2-3 days',
        isPopular: true
      },
      {
        id: 'street-signs',
        name: 'Street Signs',
        description: 'Missing or damaged street signs',
        icon: <MapPin className="h-5 w-5" />,
        avgResponseTime: '1-2 days'
      },
      {
        id: 'traffic-signals',
        name: 'Traffic Signals',
        description: 'Malfunctioning traffic lights',
        icon: <MapPin className="h-5 w-5" />,
        avgResponseTime: 'Same day'
      }
    ]
  },
  {
    id: 'code-compliance',
    name: 'Code Compliance',
    description: 'Property maintenance and code violations',
    icon: <Building className="h-6 w-6" />,
    color: 'bg-amber-500',
    priority: 'medium',
    avgResponseTime: '3-5 days',
    requestCount: 634,
    services: [
      {
        id: 'tall-grass',
        name: 'Tall Grass or Weeds',
        description: 'Report overgrown vegetation',
        icon: <TreePine className="h-5 w-5" />,
        avgResponseTime: '3-5 days',
        isPopular: true
      },
      {
        id: 'abandoned-vehicles',
        name: 'Abandoned Vehicles',
        description: 'Report abandoned or inoperable vehicles',
        icon: <Car className="h-5 w-5" />,
        avgResponseTime: '5-7 days'
      },
      {
        id: 'property-maintenance',
        name: 'Property Maintenance',
        description: 'General property code violations',
        icon: <Building className="h-5 w-5" />,
        avgResponseTime: '3-5 days'
      }
    ]
  },
  {
    id: 'public-safety',
    name: 'Public Safety',
    description: 'Street lighting and safety concerns',
    icon: <Shield className="h-6 w-6" />,
    color: 'bg-red-500',
    priority: 'high',
    avgResponseTime: '1-2 days',
    requestCount: 445,
    services: [
      {
        id: 'street-lights',
        name: 'Street Light Out',
        description: 'Report non-working street lights',
        icon: <Lightbulb className="h-5 w-5" />,
        avgResponseTime: '1-2 days',
        isPopular: true
      },
      {
        id: 'sidewalk-hazards',
        name: 'Sidewalk Hazards',
        description: 'Report dangerous sidewalk conditions',
        icon: <MapPin className="h-5 w-5" />,
        avgResponseTime: '2-3 days'
      },
      {
        id: 'emergency-reporting',
        name: 'Emergency Reporting',
        description: 'Report urgent safety concerns',
        icon: <Shield className="h-5 w-5" />,
        avgResponseTime: 'Immediate'
      }
    ]
  }
];

interface ServiceCategoriesProps {
  onServiceSelect?: (service: Service) => void;
  onCategorySelect?: (category: ServiceCategory) => void;
  showStats?: boolean;
  layout?: 'grid' | 'list';
}

export default function ServiceCategories({ 
  onServiceSelect, 
  onCategorySelect,
  showStats = true,
  layout = 'grid'
}: ServiceCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: ServiceCategory) => {
    setSelectedCategory(selectedCategory === category.id ? null : category.id);
    onCategorySelect?.(category);
  };

  const handleServiceClick = (service: Service) => {
    onServiceSelect?.(service);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Star className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <Users className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {serviceCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
                
                {showStats && (
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{category.requestCount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">requests</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{category.avgResponseTime}</p>
                      <p className="text-xs text-gray-500">avg. response</p>
                    </div>
                    <Badge className={getPriorityColor(category.priority)}>
                      {getPriorityIcon(category.priority)}
                      <span className="ml-1 capitalize">{category.priority}</span>
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            
            {selectedCategory === category.id && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => handleServiceClick(service)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="text-gray-500">{service.icon}</div>
                          <h4 className="font-medium text-sm">{service.name}</h4>
                        </div>
                        <div className="flex space-x-1">
                          {service.isPopular && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              Popular
                            </Badge>
                          )}
                          {service.isTrending && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                      <p className="text-xs text-blue-600 font-medium">
                        Usually resolved in {service.avgResponseTime}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {serviceCategories.map((category) => (
        <Card 
          key={category.id} 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
          onClick={() => handleCategoryClick(category)}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${category.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                {category.icon}
              </div>
              <Badge className={getPriorityColor(category.priority)}>
                {getPriorityIcon(category.priority)}
                <span className="ml-1 capitalize">{category.priority}</span>
              </Badge>
            </div>
            
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {category.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">{category.description}</p>
          </CardHeader>
          
          <CardContent>
            {showStats && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Requests this month</span>
                  <span className="font-semibold text-lg">{category.requestCount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Avg. response time</span>
                  <span className="font-medium text-blue-600">{category.avgResponseTime}</span>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
                  >
                    View Services
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
