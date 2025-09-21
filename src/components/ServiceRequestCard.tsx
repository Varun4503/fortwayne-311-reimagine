import { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceRequestCardProps {
  title: string;
  department: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ServiceRequestCard({
  title,
  department,
  icon,
  onClick,
  className
}: ServiceRequestCardProps) {
  return (
    <div
      className={cn(
        "group cursor-pointer bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col justify-between min-h-[160px] hover:shadow-lg hover:border-blue-300 transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 text-sm leading-tight">
            {title}
          </h3>
          <p className="text-xs text-gray-600 mt-2">
            Department: <span className="font-medium text-gray-800">{department}</span>
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 relative z-10">
          {icon && (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-4 relative z-10">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-200">
          <Plus className="h-4 w-4" />
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-4 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium text-blue-600 relative z-10">
        Create Request →
      </div>
    </div>
  );
}