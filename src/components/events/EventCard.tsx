import { format } from 'date-fns';
import { Event } from '@/types/event';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
  compact?: boolean;
}

export const EventCard = ({ event, onClick, compact = false }: EventCardProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', event.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${event.title}, from ${format(event.startTime, 'h:mm a')} to ${format(event.endTime, 'h:mm a')}`}
      className={cn(
        'rounded-md text-white cursor-pointer shadow-sm hover:scale-[1.03] active:scale-100 transition-all duration-150 ease-in-out overflow-hidden',
        compact ? 'text-xs p-1' : 'text-sm p-2'
      )}
      style={{ backgroundColor: event.color }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      draggable
      onDragStart={handleDragStart}
      title={`${event.title} - ${format(event.startTime, 'HH:mm')} to ${format(event.endTime, 'HH:mm')}`}
    >
      <div className="font-semibold truncate">{event.title}</div>

      {!compact && (
        <div className="text-xs font-normal opacity-90">
          {format(event.startTime, 'HH:mm')} – {format(event.endTime, 'HH:mm')}
        </div>
      )}

      {event.originalEventId && (
        <div className="text-xs font-semibold opacity-75">↺</div>
      )}
    </div>
  );
};
