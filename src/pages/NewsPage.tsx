import { Phone, ExternalLink, Share, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const emergencyNumbers = [
  {
    number: '211',
    details: '(260-744-0700) - First Call for Help (social services/United Way)',
  },
  {
    number: '311',
    details: '(260-427-8311) - City Government (for information, to request a city service or report a non-emergency issue)',
  },
  {
    number: '411',
    details: '(260-555-1212) Directory Assistance',
  },
  {
    number: '511',
    details: '(1-866-227-3555) INDOT',
  },
  {
    number: '711',
    details: '(1-800-934-6489) State Relay (TTY - Deaf)',
  },
  {
    number: '811',
    details: '(1-800-382-5544) Call before you dig',
  },
  {
    number: '911',
    details: 'EMERGENCY',
  },
];

const generalNumbers = [
  { service: 'AEP (electric company)', number: '1-800-311-4634' },
  { service: 'Water Company (City Utilities)', number: '260-427-1234' },
  { service: 'Nipsco (gas company)', number: '1-800-464-7726' },
  { service: 'Gas Leaks (emergency)', number: '911' },
  { service: 'Citilink', number: '260-432-4546' },
  { service: 'Graffiti Hotline', number: '260-449-4747' },
  { service: 'Drug tip Hotline', number: '260-427-1262' },
  { service: 'Noise Complaints', number: '260-427-1222 Option 1' },
  { service: "Visitor's Bureau", number: '260-424-3700' },
  { service: 'Better Business Bureau', number: '260-423-4433' },
  { service: 'BMV', number: '1-800-692-6841' },
  { service: 'Social Security Office', number: '260-747-6072' },
  { service: 'Zagster City bike rental', number: '202-999-3924' },
];

const usefulLinks = [
  {
    title: 'Ask A Fire Fighter',
    url: 'http://www.fortwaynefire department.org/',
    description: 'Connect with Fort Wayne Fire Department'
  },
  {
    title: 'Community Development',
    url: 'http://www.fwcommunitydevelopment.org/',
    description: 'Learn about city development initiatives'
  },
  {
    title: 'Visit Fort Wayne',
    url: 'http://www.visitfortwayne.com/',
    description: 'Tourism and visitor information'
  },
  {
    title: 'The Downtown Improvement District',
    url: 'http://downtownfortwayne.com/',
    description: 'Downtown Fort Wayne information and events'
  },
  {
    title: 'AccuWeather',
    url: 'http://www.accuweather.com/en/weather-news',
    description: 'Local weather forecasts and updates'
  },
];

export default function NewsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-primary">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex items-center justify-between">
              <Button className="btn-civic-accent">
                News You Can Use
              </Button>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                  <XIcon className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Emergency Numbers */}
              <div className="civic-card">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-danger" />
                  Important Three Digit Phone Numbers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyNumbers.map((item, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-secondary">{item.number}</span>
                        {item.number === '911' && (
                          <span className="px-2 py-1 bg-danger text-danger-foreground text-xs font-bold rounded-full">
                            EMERGENCY
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Numbers */}
              <div className="civic-card">
                <h2 className="text-2xl font-bold mb-6">General Phone Numbers</h2>
                <div className="space-y-3">
                  {generalNumbers.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <span className="font-medium">{item.service}</span>
                      <a 
                        href={`tel:${item.number.replace(/[^\d]/g, '')}`}
                        className="text-secondary hover:text-secondary-hover font-medium transition-colors"
                      >
                        {item.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Street Closings */}
              <div className="civic-card">
                <h2 className="text-2xl font-bold mb-4">Street Department Information</h2>
                <div className="p-6 bg-accent/10 border border-accent/20 rounded-lg">
                  <h3 className="font-semibold text-accent-foreground mb-2">Street Closing and Lane Restrictions Map</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Stay informed about current road work and traffic restrictions in Fort Wayne.
                  </p>
                  <a 
                    href="http://www.cityoffortwayne.org/publicworks/traffic-engineering/street-closings.html"
                    className="inline-flex items-center text-secondary hover:text-secondary-hover transition-colors font-medium"
                  >
                    View Street Closings Map
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="civic-card">
                <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
                <div className="space-y-3">
                  {usefulLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="block p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-secondary group-hover:text-secondary-hover transition-colors">
                            {link.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="civic-card bg-gradient-to-br from-secondary/5 to-primary/5 border-secondary/20">
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <Button className="w-full btn-civic-primary">
                    <Phone className="h-4 w-4 mr-2" />
                    Call 311
                  </Button>
                  <Button variant="outline" className="w-full">
                    Submit Service Request
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Available 24/7 for non-emergency city services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}