import { useState } from 'react';
import { format } from 'date-fns';
import { Event } from '@/types/event';
import { EventCard } from '../events/EventCard';
import { cn } from '@/lib/utils';
import { CalendarOff } from 'lucide-react';

interface CalendarDayProps {
  date: Date;
  events: Event[];
  isCurrentMonth: boolean;
  isToday: boolean;
  onClick: () => void;
  onEventClick: (event: Event) => void;
  onEventDrop: (eventId: string, newDate: Date) => void;
}

export const CalendarDay = ({
  date,
  events,
  isCurrentMonth,
  isToday,
  onClick,
  onEventClick,
  onEventDrop,
}: CalendarDayProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const eventId = e.dataTransfer.getData('text/plain');
    if (eventId) {
      onEventDrop(eventId, date);
    }
  };

  const visibleEvents = events.slice(0, 3);
  const hiddenCount = Math.max(0, events.length - 3);

  return (
    <div
      className={cn(
        'min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 cursor-pointer relative transition-colors duration-150 ease-in-out rounded-sm',
        !isCurrentMonth && 'bg-gray-50 text-gray-400',
        isCurrentMonth && 'hover:bg-blue-50',
        isToday && 'bg-blue-100 font-semibold',
        isDragOver && 'ring-2 ring-blue-400 bg-blue-50'
      )}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      aria-label={`Day ${format(date, 'PPP')}, ${events.length} event${events.length === 1 ? '' : 's'}`}
      tabIndex={0}
    >
      <div
        className={cn(
          'text-sm font-semibold mb-1',
          isToday ? 'text-blue-700' : 'text-gray-700'
        )}
      >
        {format(date, 'd')}
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-4 text-gray-400">
          <CalendarOff className="w-4 h-4 mb-1" aria-hidden="true" />
          <span className="text-xs">No events</span>
        </div>
      ) : (
        <div className="space-y-1" role="list" aria-label="Events for the day">
          {visibleEvents.map((event, index) => (
            <EventCard
              key={`${event.id}-${index}`}
              event={event}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
              compact
            />
          ))}

          {hiddenCount > 0 && (
            <div className="text-xs text-gray-500 px-1" aria-label={`${hiddenCount} more events`}>
              +{hiddenCount} more
            </div>
          )}
        </div>
      )}
    </div>
  );
};
