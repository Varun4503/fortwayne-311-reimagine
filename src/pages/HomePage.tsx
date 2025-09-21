import { useState } from 'react';
import { Search, MapPin, TrendingUp, List, Grid3X3, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceRequestCard from '@/components/ServiceRequestCard';
import Layout from '@/components/Layout';

// Service request icons (using colored backgrounds for visual distinction)
const serviceIcons = {
  'Abandoned Vehicles': <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-white text-xs">🚗</div>,
  'Bulk Trash Pickup': <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center text-white text-xs">🗑️</div>,
  'Missed Garbage': <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs">♻️</div>,
  'Tall Grass or Weeds': <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-white text-xs">🌱</div>,
  'Street Lights Out': <div className="w-6 h-6 rounded bg-yellow-500 flex items-center justify-center text-white text-xs">💡</div>,
  'Cart Maintenance': <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center text-white text-xs">🛒</div>,
  'Pothole in Street': <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs">🕳️</div>,
  'Dead Animal': <div className="w-6 h-6 rounded bg-gray-500 flex items-center justify-center text-white text-xs">⚰️</div>,
};

const trendingServices = [
  {
    title: 'Abandoned Vehicles',
    department: 'Neighborhood Code Compliance',
    type: 'Abandoned Vehicles' as keyof typeof serviceIcons,
  },
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
    title: 'Cart Maintenance',
    department: 'Solid Waste',
    type: 'Cart Maintenance' as keyof typeof serviceIcons,
  },
  {
    title: 'Pothole in Street',
    department: 'Streets',
    type: 'Pothole in Street' as keyof typeof serviceIcons,
  },
  {
    title: 'Dead Animal',
    department: 'Streets',
    type: 'Dead Animal' as keyof typeof serviceIcons,
  },
];

const recentRequests = [
  {
    id: '250921-100001',
    type: 'Missed Garbage',
    location: 'LEXINGTON AVE',
    timeAgo: '10 hours ago',
    status: 'Subscribe' as const,
    statusColor: 'secondary' as const
  },
  {
    id: '250920-100039',
    type: 'Recycling',
    location: 'LEXINGTON AVE',
    timeAgo: '12 hours ago',
    status: 'Subscribe' as const,
    statusColor: 'secondary' as const
  },
  {
    id: '250920-100033',
    type: 'Tall Grass or Weeds',
    location: 'MAXINE DR',
    timeAgo: '12 hours ago',
    status: 'Subscribe' as const,
    statusColor: 'secondary' as const
  },
  {
    id: '250920-100029',
    type: 'Abandoned Vehicles',
    location: 'MICHIGAN AVE',
    timeAgo: '13 hours ago',
    status: 'Subscribe' as const,
    statusColor: 'secondary' as const
  },
  {
    id: '250920-100028',
    type: 'Pothole in Street',
    location: 'S CLINTON ST',
    timeAgo: '12 min 29 sec',
    status: 'Resolved' as const,
    statusColor: 'success' as const
  },
];

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-primary via-primary to-secondary overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-6 py-12 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Welcome to<br />
                  <span className="text-accent">City of Fort Wayne</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/90">
                  The <span className="font-semibold text-accent">SMART</span> City 311
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="mt-10 flex justify-center">
                <div className="w-full max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Missed Garbage, Dead Animal etc."
                      className="pl-12 pr-4 py-4 text-lg bg-white border-0 shadow-lg focus:shadow-xl transition-shadow duration-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="btn-civic-primary shadow-lg hover:shadow-xl transition-all duration-200">
                  <FileText className="mr-2 h-5 w-5" />
                  New Service Request
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary shadow-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Track a Service Request
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary shadow-lg">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  SMART® Knowledge Base
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <Tabs defaultValue="trending" className="w-full">
            <div className="flex items-center justify-between mb-8">
              <TabsList className="grid w-fit grid-cols-2 bg-white shadow-sm">
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Active Service Requests
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Service Requests
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="active" className="space-y-8">
              <div className="civic-card">
                <h2 className="text-2xl font-semibold mb-4">Active Service Requests Map</h2>
                <div className="bg-muted rounded-lg p-8 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                </div>
              </div>
              
              <div className="civic-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Recent Service Requests</h3>
                  <span className="text-sm text-muted-foreground">Powered by Esri</span>
                </div>
                <div className="space-y-3">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <div>
                          <p className="font-medium">{request.type}</p>
                          <p className="text-sm text-muted-foreground">{request.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">Created about {request.timeAgo}</span>
                        <span className={`status-${request.status.toLowerCase().replace(' ', '-')}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingServices.map((service) => (
                  <ServiceRequestCard
                    key={service.title}
                    title={service.title}
                    department={service.department}
                    icon={serviceIcons[service.type]}
                    onClick={() => {
                      console.log(`Creating request for: ${service.title}`);
                    }}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}