
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const CalendarHeader = ({ currentDate, onNavigate }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('prev')}
          className="hover:bg-blue-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('next')}
          className="hover:bg-blue-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
