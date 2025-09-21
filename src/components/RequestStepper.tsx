import { useState } from 'react';
import { 
  MapPin, 
  FileText, 
  Camera, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Upload,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StepperStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface RequestData {
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
    description: string;
  };
  service: {
    type: string;
    category: string;
    description: string;
  };
  details: {
    description: string;
    urgency: 'low' | 'medium' | 'high';
    contactInfo: {
      name: string;
      email: string;
      phone: string;
    };
  };
  photos: File[];
}

interface RequestStepperProps {
  onComplete: (data: RequestData) => void;
  onCancel: () => void;
  initialData?: Partial<RequestData>;
}

export default function RequestStepper({ 
  onComplete, 
  onCancel, 
  initialData 
}: RequestStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [requestData, setRequestData] = useState<RequestData>({
    location: {
      address: '',
      coordinates: { lat: 0, lng: 0 },
      description: ''
    },
    service: {
      type: '',
      category: '',
      description: ''
    },
    details: {
      description: '',
      urgency: 'medium',
      contactInfo: {
        name: '',
        email: '',
        phone: ''
      }
    },
    photos: [],
    ...initialData
  });

  const steps: StepperStep[] = [
    {
      id: 'location',
      title: 'Location',
      description: 'Where is the issue?',
      icon: <MapPin className="h-5 w-5" />,
      component: <LocationStep 
        data={requestData.location} 
        onChange={(location) => setRequestData(prev => ({ ...prev, location }))} 
      />
    },
    {
      id: 'service',
      title: 'Service Type',
      description: 'What needs to be fixed?',
      icon: <FileText className="h-5 w-5" />,
      component: <ServiceStep 
        data={requestData.service} 
        onChange={(service) => setRequestData(prev => ({ ...prev, service }))} 
      />
    },
    {
      id: 'details',
      title: 'Details',
      description: 'Tell us more',
      icon: <Camera className="h-5 w-5" />,
      component: <DetailsStep 
        data={requestData.details} 
        photos={requestData.photos}
        onChange={(details) => setRequestData(prev => ({ ...prev, details }))}
        onPhotosChange={(photos) => setRequestData(prev => ({ ...prev, photos }))}
      />
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Confirm your request',
      icon: <CheckCircle className="h-5 w-5" />,
      component: <ReviewStep data={requestData} />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(requestData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return requestData.location.address.length > 0;
      case 1:
        return requestData.service.type.length > 0;
      case 2:
        return requestData.details.description.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Report an Issue</h1>
          <Button variant="ghost" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Progress value={progress} className="mb-4" />
        
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "stepper-step flex items-center",
                index === currentStep && "active",
                index < currentStep && "completed"
              )}>
                <div className="stepper-indicator">
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "stepper-line",
                  index < currentStep && "completed"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {steps[currentStep].icon}
            <span>{steps[currentStep].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {steps[currentStep].component}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={onCancel}>
            Save as Draft
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid(currentStep)}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Submit Request' : 'Next'}</span>
            {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Location Step Component
function LocationStep({ 
  data, 
  onChange 
}: { 
  data: RequestData['location']; 
  onChange: (location: RequestData['location']) => void;
}) {
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onChange({
            ...data,
            coordinates: { lat: latitude, lng: longitude }
          });
          setIsDetecting(false);
        },
        () => {
          setIsDetecting(false);
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address or Location
        </label>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter address or describe the location"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={detectLocation}
            disabled={isDetecting}
            className="px-4"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
        {isDetecting && (
          <p className="text-sm text-blue-600 mt-2">Detecting your location...</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Location Details (Optional)
        </label>
        <Textarea
          placeholder="e.g., Near the intersection of Main St and Oak Ave, behind the blue building"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={3}
        />
      </div>

      {/* Map Placeholder */}
      <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Interactive map would appear here</p>
        </div>
      </div>
    </div>
  );
}

// Service Step Component
function ServiceStep({ 
  data, 
  onChange 
}: { 
  data: RequestData['service']; 
  onChange: (service: RequestData['service']) => void;
}) {
  const serviceTypes = [
    { id: 'pothole', name: 'Pothole', category: 'Streets', description: 'Road damage or potholes' },
    { id: 'trash', name: 'Missed Trash Pickup', category: 'Sanitation', description: 'Garbage or recycling not collected' },
    { id: 'streetlight', name: 'Street Light Out', category: 'Public Safety', description: 'Non-working street light' },
    { id: 'grass', name: 'Tall Grass', category: 'Code Compliance', description: 'Overgrown vegetation' },
    { id: 'vehicle', name: 'Abandoned Vehicle', category: 'Code Compliance', description: 'Abandoned or inoperable vehicle' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What type of issue are you reporting?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {serviceTypes.map((service) => (
            <div
              key={service.id}
              className={cn(
                "p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:shadow-sm",
                data.type === service.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
              )}
              onClick={() => onChange({ ...data, type: service.id, category: service.category })}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-sm">{service.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                  <Badge variant="secondary" className="text-xs mt-2">
                    {service.category}
                  </Badge>
                </div>
                {data.type === service.id && (
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Details
        </label>
        <Textarea
          placeholder="Provide any additional information about the issue..."
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
}

// Details Step Component
function DetailsStep({ 
  data, 
  photos, 
  onChange, 
  onPhotosChange 
}: { 
  data: RequestData['details']; 
  photos: File[];
  onChange: (details: RequestData['details']) => void;
  onPhotosChange: (photos: File[]) => void;
}) {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onPhotosChange([...photos, ...files]);
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe the Issue
        </label>
        <Textarea
          placeholder="Please provide a detailed description of the issue..."
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Urgency Level
        </label>
        <div className="flex space-x-3">
          {[
            { value: 'low', label: 'Low', description: 'Can wait a few days' },
            { value: 'medium', label: 'Medium', description: 'Should be addressed soon' },
            { value: 'high', label: 'High', description: 'Safety concern or urgent' }
          ].map((urgency) => (
            <div
              key={urgency.value}
              className={cn(
                "flex-1 p-3 border rounded-lg cursor-pointer transition-all",
                data.urgency === urgency.value 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => onChange({ ...data, urgency: urgency.value as any })}
            >
              <h4 className="font-medium text-sm">{urgency.label}</h4>
              <p className="text-xs text-gray-600 mt-1">{urgency.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photos (Optional)
        </label>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <Input
            placeholder="Enter your name"
            value={data.contactInfo.name}
            onChange={(e) => onChange({
              ...data,
              contactInfo: { ...data.contactInfo, name: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={data.contactInfo.email}
            onChange={(e) => onChange({
              ...data,
              contactInfo: { ...data.contactInfo, email: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone (Optional)
          </label>
          <Input
            type="tel"
            placeholder="(260) 555-0123"
            value={data.contactInfo.phone}
            onChange={(e) => onChange({
              ...data,
              contactInfo: { ...data.contactInfo, phone: e.target.value }
            })}
          />
        </div>
      </div>
    </div>
  );
}

// Review Step Component
function ReviewStep({ data }: { data: RequestData }) {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h3 className="font-medium text-green-900">Ready to Submit</h3>
        </div>
        <p className="text-sm text-green-700 mt-1">
          Your request will be reviewed and assigned to the appropriate department.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Location</h4>
          <p className="text-sm text-gray-600">{data.location.address}</p>
          {data.location.description && (
            <p className="text-sm text-gray-500 mt-1">{data.location.description}</p>
          )}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Service Type</h4>
          <p className="text-sm text-gray-600">{data.service.type}</p>
          {data.service.description && (
            <p className="text-sm text-gray-500 mt-1">{data.service.description}</p>
          )}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Details</h4>
          <p className="text-sm text-gray-600">{data.details.description}</p>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant="secondary">
              Urgency: {data.details.urgency}
            </Badge>
            {data.photos.length > 0 && (
              <Badge variant="secondary">
                {data.photos.length} photo(s)
              </Badge>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
          <p className="text-sm text-gray-600">{data.details.contactInfo.name}</p>
          <p className="text-sm text-gray-600">{data.details.contactInfo.email}</p>
          {data.details.contactInfo.phone && (
            <p className="text-sm text-gray-600">{data.details.contactInfo.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
