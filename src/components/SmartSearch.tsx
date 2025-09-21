import { useState, useRef, useEffect } from 'react';
import { Search, Mic, MicOff, X, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'service' | 'location' | 'recent' | 'trending';
  category?: string;
  icon?: React.ReactNode;
  description?: string;
}

interface SmartSearchProps {
  onSearch: (query: string) => void;
  onServiceSelect?: (service: string) => void;
  placeholder?: string;
  className?: string;
}

const searchSuggestions: SearchSuggestion[] = [
  // Services
  { id: '1', text: 'Report a pothole', type: 'service', category: 'Streets', icon: <MapPin className="h-4 w-4" />, description: 'Street maintenance' },
  { id: '2', text: 'Missed trash pickup', type: 'service', category: 'Sanitation', icon: <MapPin className="h-4 w-4" />, description: 'Waste collection' },
  { id: '3', text: 'Street light out', type: 'service', category: 'Public Safety', icon: <MapPin className="h-4 w-4" />, description: 'Street lighting' },
  { id: '4', text: 'Tall grass complaint', type: 'service', category: 'Code Compliance', icon: <MapPin className="h-4 w-4" />, description: 'Property maintenance' },
  { id: '5', text: 'Abandoned vehicle', type: 'service', category: 'Code Compliance', icon: <MapPin className="h-4 w-4" />, description: 'Vehicle removal' },
  
  // Trending
  { id: '6', text: 'Bulk trash pickup', type: 'trending', category: 'Sanitation', icon: <TrendingUp className="h-4 w-4" />, description: 'Large item collection' },
  { id: '7', text: 'Sidewalk repair', type: 'trending', category: 'Streets', icon: <TrendingUp className="h-4 w-4" />, description: 'Pedestrian safety' },
  
  // Recent
  { id: '8', text: 'Pothole on Main Street', type: 'recent', category: 'Streets', icon: <Clock className="h-4 w-4" />, description: 'Reported 2 days ago' },
  { id: '9', text: 'Trash pickup on Oak Ave', type: 'recent', category: 'Sanitation', icon: <Clock className="h-4 w-4" />, description: 'Reported 1 week ago' },
];

export default function SmartSearch({ 
  onSearch, 
  onServiceSelect, 
  placeholder = "Report an issue, search services, or ask a question...",
  className = ""
}: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setShowSuggestions(true);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.category?.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (suggestion.type === 'service' && onServiceSelect) {
      onServiceSelect(suggestion.text);
    } else {
      onSearch(suggestion.text);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (suggestion: SearchSuggestion) => {
    if (suggestion.icon) return suggestion.icon;
    
    switch (suggestion.type) {
      case 'service': return <MapPin className="h-4 w-4" />;
      case 'trending': return <TrendingUp className="h-4 w-4" />;
      case 'recent': return <Clock className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getSuggestionBadgeColor = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case 'service': return 'bg-blue-100 text-blue-800';
      case 'trending': return 'bg-green-100 text-green-800';
      case 'recent': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`search-container ${className}`}>
      <div className="relative">
        <Search className="search-icon" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          className="search-input"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          {recognitionRef.current && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoiceInput}
              className={`h-8 w-8 p-0 ${isListening ? 'text-red-600' : 'text-gray-400 hover:text-blue-600'}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  index === selectedIndex 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex-shrink-0 text-gray-500">
                  {getSuggestionIcon(suggestion)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {suggestion.text}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getSuggestionBadgeColor(suggestion)}`}
                    >
                      {suggestion.type}
                    </Badge>
                  </div>
                  
                  {suggestion.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {suggestion.description}
                    </p>
                  )}
                  
                  {suggestion.category && (
                    <p className="text-xs text-blue-600 mt-1">
                      {suggestion.category}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Voice Input Status */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-blue-900">Listening...</p>
              </div>
              <p className="text-xs text-blue-700 mt-1">Speak clearly to search</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
