import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { Event } from '@/types/event';
import { CalendarDay } from './CalendarDay';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onEventDrop: (eventId: string, newDate: Date) => void;
  viewMode: 'weekly' | 'daily';
}

export const CalendarGrid = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
  onEventDrop,
  viewMode,
}: CalendarGridProps) => {
  const isMobile = useIsMobile();

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.startTime, date));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let calendarDays: Date[] = [];

  if (isMobile) {
    if (viewMode === 'daily') {
      calendarDays = [currentDate];
    } else {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      calendarDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    }
  } else {
    const monthStart = startOfMonth(currentDate);
    const calendarStart = new Date(monthStart);
    calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());
    const calendarEnd = new Date(calendarStart);
    calendarEnd.setDate(calendarEnd.getDate() + 41); // 6 weeks grid
    calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Week headers */}
      <div className="grid grid-cols-7 bg-gray-50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div
        className={cn(
          'grid',
          isMobile && viewMode === 'daily' ? 'grid-cols-1' : 'grid-cols-7'
        )}
      >
        {calendarDays.map((date) => {
          const dayEvents = getEventsForDate(date);
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isTodayDate = isToday(date);

          return (
            <CalendarDay
              key={format(date, 'yyyy-MM-dd')}
              date={date}
              events={dayEvents}
              isCurrentMonth={isCurrentMonth}
              isToday={isTodayDate}
              onClick={() => onDateClick(date)}
              onEventClick={onEventClick}
              onEventDrop={onEventDrop}
            />
          );
        })}
      </div>
    </div>
  );
};
