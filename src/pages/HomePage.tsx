import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  FileText, 
  Lightbulb, 
  Plus,
  Filter,
  ZoomIn,
  ZoomOut,
  Phone,
  Mail,
  Map,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  MessageSquare,
  Download,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Bot,
  BarChart3,
  Users,
  Star,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceRequestCard from '@/components/ServiceRequestCard';
import Layout from '@/components/Layout';
import SmartSearch from '@/components/SmartSearch';
import ServiceCategories from '@/components/ServiceCategories';
import RequestTracker from '@/components/RequestTracker';
import RequestStepper from '@/components/RequestStepper';
import { ToastProvider, civicToasts } from '@/components/ToastSystem';

// Service request icons with better visual design
const serviceIcons = {
  'Abandoned Vehicles': <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><MapPin className="h-5 w-5" /></div>,
  'Bulk Trash Pickup': <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><FileText className="h-5 w-5" /></div>,
  'Missed Garbage': <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><FileText className="h-5 w-5" /></div>,
  'Tall Grass or Weeds': <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><FileText className="h-5 w-5" /></div>,
  'Street Lights Out': <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600"><Lightbulb className="h-5 w-5" /></div>,
  'Cart Maintenance': <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><FileText className="h-5 w-5" /></div>,
  'Pothole in Street': <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600"><MapPin className="h-5 w-5" /></div>,
  'Dead Animal': <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600"><FileText className="h-5 w-5" /></div>,
  'Minimum Housing': <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><FileText className="h-5 w-5" /></div>,
  'Missed Recycling': <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600"><FileText className="h-5 w-5" /></div>,
};

const trendingServices = [
  {
    title: 'Bulk Trash Pickup',
    department: 'Solid Waste',
    type: 'Bulk Trash Pickup' as keyof typeof serviceIcons,
  },
  {
    title: 'Missed Garbage',
    department: 'Solid Waste',
    type: 'Missed Garbage' as keyof typeof serviceIcons,
  },
  {
    title: 'Tall Grass or Weeds',
    department: 'Neighborhood Code Compliance',
    type: 'Tall Grass or Weeds' as keyof typeof serviceIcons,
  },
  {
    title: 'Street Lights Out (Not traffic signals)',
    department: 'Street Lighting',
    type: 'Street Lights Out' as keyof typeof serviceIcons,
  },
  {
    title: 'Minimum Housing- Commercial',
    department: 'Neighborhood Code Compliance',
    type: 'Minimum Housing' as keyof typeof serviceIcons,
  },
  {
    title: 'Missed Recycling',
    department: 'Solid Waste',
    type: 'Missed Recycling' as keyof typeof serviceIcons,
  },
  {
    title: 'Abandoned Vehicles',
    department: 'Neighborhood Code Compliance',
    type: 'Abandoned Vehicles' as keyof typeof serviceIcons,
  },
  {
    title: 'Cart Maintenance',
    department: 'Solid Waste',
    type: 'Cart Maintenance' as keyof typeof serviceIcons,
  },
];

const recentRequests = [
  {
    id: '250921-100001',
    type: 'Recycling',
    location: 'LEXINGTON AVE',
    timeAgo: 'Created about 10 hours ago',
    status: 'Subscribe' as const,
    statusColor: 'red' as const,
    source: 'Web Portal'
  },
  {
    id: '250920-100039',
    type: 'Tall Grass or Weeds',
    location: 'MAXINE DR',
    timeAgo: 'Created about 12 hours ago',
    status: 'Subscribe' as const,
    statusColor: 'orange' as const,
    source: 'Web Portal'
  },
  {
    id: '250920-100033',
    type: 'Abandoned Vehicles',
    location: 'MICHIGAN AVE',
    timeAgo: 'Created about 13 hours ago',
    status: 'Subscribe' as const,
    statusColor: 'orange' as const,
    source: 'Web Portal'
  },
  {
    id: '250920-100029',
    type: 'Pothole in Street',
    location: 'S CLINTON ST',
    timeAgo: 'Resolved time 1 Hour 12 Minutes 29 Seconds',
    status: 'Resolved' as const,
    statusColor: 'green' as const,
    source: 'Web Portal'
  },
];

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'active' | 'trending'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [showRequestStepper, setShowRequestStepper] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const getStatusIcon = (color: string) => {
    switch (color) {
      case 'red': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'orange': return <Pause className="h-4 w-4 text-orange-500" />;
      case 'green': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log('Searching for:', query);
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service.name);
    setShowRequestStepper(true);
  };

  const handleRequestComplete = (data: any) => {
    setShowRequestStepper(false);
    civicToasts.requestSubmitted('FW-2024-001234');
  };

  const handleRequestCancel = () => {
    setShowRequestStepper(false);
  };

  if (showRequestStepper) {
    return (
      <Layout>
        <RequestStepper
          onComplete={handleRequestComplete}
          onCancel={handleRequestCancel}
        />
      </Layout>
    );
  }

  return (
    <Layout>
        <div className="min-h-screen">
        {/* Modern Hero Banner */}
        <div className="relative overflow-hidden h-40">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/banner.jpg)' }}
          ></div>
          
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <img 
                      src="/cityLogo.png" 
                      alt="City of Fort Wayne Logo" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="text-white">
                    <h1 className="text-xl font-bold">Welcome to City of Fort Wayne</h1>
                    <p className="text-sm opacity-90">The <span className="font-semibold text-yellow-300">SMART</span> City 311 By Nebulogic</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-4 py-2"
                    onClick={() => setShowRequestStepper(true)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    New Service Request
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600 px-4 py-2"
                    onClick={() => console.log('Navigate to tracking')}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Track Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-6 py-2 lg:px-8">
            <div className="flex justify-center">
              <SmartSearch
                onSearch={handleSearch}
                onServiceSelect={handleServiceSelect}
                placeholder="Report an issue, search services, or ask a question..."
                className="w-full max-w-2xl"
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          {/* Custom Tab Navigation */}
          <div className="relative mb-4">
            <div className="flex w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all duration-300 relative ${
                  viewMode === 'active' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('active')}
              >
                <MapPin className="h-4 w-4" />
                Active Service Requests
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all duration-300 relative ${
                  viewMode === 'trending' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('trending')}
              >
                <TrendingUp className="h-4 w-4" />
                Trending Service Requests
              </button>
            </div>
            
            {/* Sliding Indicator */}
            <div 
              className={`absolute bottom-0 h-1 bg-blue-600 transition-all duration-300 ease-in-out ${
                viewMode === 'active' ? 'left-0' : 'left-1/2'
              }`}
              style={{ width: '50%' }}
            />
          </div>

            {/* Content based on selected tab */}
            {viewMode === 'active' && (
              <div className="space-y-4">
                {/* Interactive Map Section */}
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Interactive Service Request Map</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Map Search */}
                      <div className="absolute top-2 right-2 z-10 w-48">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Location, Street"
                            className="pl-8 pr-8 bg-white shadow-lg text-sm h-8"
                            value={mapSearchQuery}
                            onChange={(e) => setMapSearchQuery(e.target.value)}
                          />
                          <Filter className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Map Placeholder */}
                      <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Map className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-600">Interactive Map</p>
                            <p className="text-xs text-gray-500">Powered by Esri</p>
                          </div>
                        </div>
                        
                        {/* Map Attribution */}
                        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                          Esri Community Maps Contributors, Esri, TomTom, Garmin, SafeGraph, GeoTechnologies, Inc, METI/NASA, USGS, EPA, NPS, US Census Bureau, USDA, USFWS
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Unresolved</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Resolved</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Re-Open</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>Waiting</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>Close-Reclassify</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                          <span>Close-Disregard</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                          <span>Close-Resolved</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Request Tracker */}
                <RequestTracker
                  showStats={true}
                  onRequestSelect={(request) => {
                    console.log('Selected request:', request);
                  }}
                />
              </div>
            )}

            {viewMode === 'trending' && (
              <div className="space-y-4">
                <ServiceCategories
                  onServiceSelect={handleServiceSelect}
                  showStats={true}
                  layout="grid"
                />
              </div>
            )}
        </div>

        {/* Contact Information Section */}
        <div className="bg-white border-t">
          <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Contact Us</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Citizens Square</p>
                  <p>200 East Berry Street</p>
                  <p>Suite 470</p>
                  <p>Fort Wayne, IN 46802</p>
                  <p className="font-medium text-blue-600">Phone: 311 or (260) 427-8311</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Useful Links</h3>
                <div className="space-y-1 text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 block">Privacy and Security</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 block">Contact the Webmaster</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 block">ADA Compliance</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Connect With Us</h3>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  <p>@FortWayneIND</p>
                  <p>@CityofFortWayne</p>
                </div>
              </div>
              
              <div>
                 <h3 className="text-base font-semibold text-gray-900 mb-2">Download the App</h3>
                  <div className="flex flex-col space-y-2">
                   <Button size="sm" variant="outline" className="text-xs">
                      <Download className="h-2 w-1 mr-1" />
                       iOS
                   </Button>
                   <Button size="sm" variant="outline" className="text-xs">
                      <Download className="h-2 w-1 mr-1" />
                      Android
                   </Button>
                 </div>
            </div>

            </div>
          </div>
        </div>

        {/* Chatbot */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <Bot className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-20 right-0 text-center">
            <p className="text-sm font-medium text-gray-700">Ask SAIC</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}