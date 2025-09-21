import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Search, 
  Lightbulb, 
  Newspaper, 
  MessageSquare, 
  Phone,
  Building2,
  Menu,
  X,
  Settings,
  Contrast,
  Type,
  Globe,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isActive?: boolean;
}

interface MobileNavigationProps {
  className?: string;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Report', href: '/report', icon: FileText },
  { name: 'Track', href: '/track', icon: Search },
  { name: 'Status', href: '/status', icon: Lightbulb },
  { name: 'Help', href: '/help', icon: MessageSquare },
];

export default function MobileNavigation({ className }: MobileNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    language: 'en'
  });

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const toggleAccessibility = (setting: keyof typeof accessibilitySettings) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const toggleLanguage = () => {
    const languages = ['en', 'es', 'my']; // English, Spanish, Burmese
    const currentIndex = languages.indexOf(accessibilitySettings.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setAccessibilitySettings(prev => ({
      ...prev,
      language: languages[nextIndex]
    }));
  };

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'en': return 'English';
      case 'es': return 'Español';
      case 'my': return 'မြန်မာ';
      default: return 'English';
    }
  };

  return (
    <div className={cn("lg:hidden", className)}>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Fort Wayne 311</h1>
              <p className="text-xs text-gray-500">SMART City Services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
              className="h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 relative"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                3
              </Badge>
            </Button>
          </div>
        </div>

        {/* Accessibility Menu */}
        {showAccessibilityMenu && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Contrast className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">High Contrast</span>
                </div>
                <Button
                  variant={accessibilitySettings.highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAccessibility('highContrast')}
                  className="h-6 px-3 text-xs"
                >
                  {accessibilitySettings.highContrast ? 'On' : 'Off'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Large Text</span>
                </div>
                <Button
                  variant={accessibilitySettings.largeText ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAccessibility('largeText')}
                  className="h-6 px-3 text-xs"
                >
                  {accessibilitySettings.largeText ? 'On' : 'Off'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Language</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="h-6 px-3 text-xs"
                >
                  {getLanguageName(accessibilitySettings.language)}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1",
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="relative">
                  <item.icon className={cn(
                    "h-5 w-5 mb-1",
                    isActive ? "text-blue-600" : "text-gray-600"
                  )} />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-500">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium truncate w-full text-center",
                  isActive ? "text-blue-600" : "text-gray-600"
                )}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => handleNavigation('/report')}
        >
          <FileText className="h-6 w-6" />
        </Button>
      </div>

      {/* Accessibility Classes */}
      <div className={cn(
        accessibilitySettings.highContrast && "high-contrast",
        accessibilitySettings.largeText && "large-text"
      )} />
    </div>
  );
}
