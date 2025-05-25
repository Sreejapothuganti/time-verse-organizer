
import { format } from 'date-fns';
import { Event } from '@/types/event';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  onClick: (e: React.MouseEvent) => void;
  compact?: boolean;
}

export const EventCard = ({ event, onClick, compact = false }: EventCardProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', event.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={cn(
        "rounded-md p-2 text-white text-sm cursor-pointer transition-transform hover:scale-105 shadow-sm",
        compact ? "text-xs p-1" : "p-2"
      )}
      style={{ backgroundColor: event.color }}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      title={`${event.title} - ${format(event.startTime, 'HH:mm')} to ${format(event.endTime, 'HH:mm')}`}
    >
      <div className="font-medium truncate">{event.title}</div>
      {!compact && (
        <div className="text-xs opacity-90">
          {format(event.startTime, 'HH:mm')} - {format(event.endTime, 'HH:mm')}
        </div>
      )}
      {event.originalEventId && (
        <div className="text-xs opacity-75">↺</div>
      )}
    </div>
  );
};
