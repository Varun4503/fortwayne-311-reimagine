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
        "service-card group cursor-pointer p-6 h-full flex flex-col justify-between min-h-[140px]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Department: <span className="font-medium">{department}</span>
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 relative z-10">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-secondary/10 transition-colors duration-200">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-4 relative z-10">
        <div className="flex items-center justify-center w-8 h-8 bg-secondary text-secondary-foreground rounded-full group-hover:scale-110 transition-transform duration-200">
          <Plus className="h-4 w-4" />
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-4 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium text-secondary relative z-10">
        Create Request →
      </div>
    </div>
  );
}