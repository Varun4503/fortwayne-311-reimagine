import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const contactMethods = [
  {
    icon: <Mail className="h-8 w-8" />,
    title: 'Email Here',
    content: '311@cityoffortwayne.org',
    href: 'mailto:311@cityoffortwayne.org'
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Mailing Address',
    content: (
      <div className="text-center">
        <p>Citizens Square</p>
        <p>200 East Berry Street, Suite 470</p>
        <p>Fort Wayne, IN 46802</p>
      </div>
    )
  },
  {
    icon: <Phone className="h-8 w-8" />,
    title: 'Call Here',
    content: (
      <div className="text-center">
        <p className="font-semibold">Dial 311</p>
        <p className="text-sm">From outside Allen County</p>
        <p className="text-secondary font-medium">(260) 427-8311</p>
      </div>
    ),
    href: 'tel:260-427-8311'
  }
];

const socialLinks = [
  { 
    name: 'X (Twitter)', 
    handle: '@CityofFortWayne',
    bgColor: 'bg-black',
    href: 'https://twitter.com/CityofFortWayne'
  },
  { 
    name: 'Facebook', 
    handle: '@CityofFortWayne',
    bgColor: 'bg-blue-600',
    href: 'https://facebook.com/CityofFortWayne'
  },
  { 
    name: 'YouTube', 
    handle: '@FortWayneIND',
    bgColor: 'bg-red-600',
    href: 'https://youtube.com/@FortWayneIND'
  },
  { 
    name: 'Blog', 
    handle: 'City Updates',
    bgColor: 'bg-orange-500',
    href: '#'
  }
];

const appDownloads = [
  {
    name: 'iOS App Store',
    icon: '🍎',
    href: '#'
  },
  {
    name: 'Google Play Store', 
    icon: '🤖',
    href: '#'
  }
];

const usefulLinks = [
  { name: 'Privacy and Security', href: '/privacy' },
  { name: 'Contact the Webmaster', href: '/webmaster' },
  { name: 'ADA Compliance', href: '/ada' },
  { name: 'RSS Feed', href: '/rss' },
  { name: 'Site Map', href: '/sitemap' }
];

export default function ContactPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-primary">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <Button className="btn-civic-accent">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary text-secondary-foreground rounded-full mb-6 mx-auto">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{method.title}</h3>
                <div className="text-lg text-muted-foreground">
                  {method.href ? (
                    <a 
                      href={method.href}
                      className="hover:text-secondary transition-colors duration-200"
                    >
                      {method.content}
                    </a>
                  ) : (
                    method.content
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Details */}
            <div className="civic-card">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium">Citizens Square</p>
                <p>200 East Berry Street</p>
                <p>Suite 470</p>
                <p>Fort Wayne, IN 46802</p>
                <p className="pt-2">
                  Phone: <a href="tel:260-427-8311" className="text-secondary hover:underline">(260) 427-8311</a>
                </p>
              </div>
            </div>

            {/* Useful Links */}
            <div className="civic-card">
              <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
              <div className="space-y-2">
                {usefulLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-secondary hover:text-secondary-hover transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="civic-card">
              <h4 className="text-lg font-semibold mb-4">Connect Us On</h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex items-center justify-center p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 group"
                    title={`${social.name}: ${social.handle}`}
                  >
                    <div className={`w-8 h-8 ${social.bgColor} rounded flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform duration-200`}>
                      {social.name.charAt(0)}
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                {socialLinks.map((social) => (
                  <p key={social.name}>
                    <span className="font-medium">{social.name}:</span> {social.handle}
                  </p>
                ))}
              </div>
            </div>

            {/* Mobile Apps */}
            <div className="civic-card">
              <h4 className="text-lg font-semibold mb-4">Download the App</h4>
              <div className="space-y-3">
                {appDownloads.map((app) => (
                  <a
                    key={app.name}
                    href={app.href}
                    className="flex items-center p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 group"
                  >
                    <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200">
                      {app.icon}
                    </span>
                    <span className="text-sm font-medium">{app.name}</span>
                    <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
              <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                <p className="text-xs text-accent-foreground font-medium">
                  Get instant access to 311 services on your mobile device
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}