import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  viewMode: 'weekly' | 'daily';
  setViewMode: (mode: 'weekly' | 'daily') => void;
  onToday: () => void; // 🆕 added callback
}

export const CalendarHeader = ({
  currentDate,
  onNavigate,
  viewMode,
  setViewMode,
  onToday,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        {format(currentDate, 'MMMM yyyy')}
      </h2>

      <div className="flex flex-wrap gap-2 justify-end items-center">
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
        <Button
          variant="secondary"
          size="sm"
          onClick={onToday}
        >
          Today
        </Button>

        <Button
          size="sm"
          variant={viewMode === 'weekly' ? 'default' : 'outline'}
          onClick={() => setViewMode('weekly')}
        >
          Weekly
        </Button>
        <Button
          size="sm"
          variant={viewMode === 'daily' ? 'default' : 'outline'}
          onClick={() => setViewMode('daily')}
        >
          Daily
        </Button>
      </div>
    </div>
  );
};
