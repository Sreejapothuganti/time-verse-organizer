
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { Event } from '@/types/event';
import { CalendarDay } from './CalendarDay';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onEventDrop: (eventId: string, newDate: Date) => void;
}

export const CalendarGrid = ({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick,
  onEventDrop 
}: CalendarGridProps) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Get the calendar grid (42 days including previous/next month days)
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(calendarStart.getDate() - monthStart.getDay());
  
  const calendarEnd = new Date(calendarStart);
  calendarEnd.setDate(calendarEnd.getDate() + 41);
  
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.startTime, date)
    );
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Week day headers */}
      <div className="grid grid-cols-7 bg-gray-50">
        {weekDays.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
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
