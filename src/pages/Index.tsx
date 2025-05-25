import { useState } from 'react';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { EventForm } from '@/components/events/EventForm';
import { EventDetails } from '@/components/events/EventDetails';
import { SearchBar } from '@/components/calendar/SearchBar';
import { useEvents } from '@/hooks/useEvents';
import { useCalendar } from '@/hooks/useCalendar';
import { useToast } from '@/components/ui/use-toast';
import { Event } from '@/types/event';
import { Footer } from '@/components/ui/Footer';

const Index = () => {
  const { currentDate, setCurrentDate, navigateMonth } = useCalendar();
  const { events, addEvent, updateEvent, deleteEvent, searchEvents, hasEventConflict } = useEvents();
  const { toast } = useToast();

  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');

  const filteredEvents = searchEvents(searchTerm);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventForm(false);
  };

  const handleEventSave = (eventData: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setShowEventForm(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleEventDelete = (eventId: string) => {
    deleteEvent(eventId);
    setSelectedEvent(null);
    setShowEventForm(false);
  };

  const handleEventDrop = (eventId: string, newDate: Date) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const updatedStart = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      event.startTime.getHours(),
      event.startTime.getMinutes()
    );

    const updatedEnd = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      event.endTime.getHours(),
      event.endTime.getMinutes()
    );

    const newEventData = {
      ...event,
      startTime: updatedStart,
      endTime: updatedEnd
    };

    const isConflict = hasEventConflict(newEventData, event.id);
    if (isConflict) {
      toast({
        title: 'Conflict Detected',
        description: 'This event overlaps with another event. Please choose a different time.',
      });
      return;
    }

    updateEvent(eventId, newEventData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Calendar */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Calendar</h1>
                <SearchBar 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>

              <CalendarHeader 
                currentDate={currentDate}
                onNavigate={navigateMonth}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onToday={() => setCurrentDate(new Date())} // ✅ added
              />

              <CalendarGrid
                currentDate={currentDate}
                events={filteredEvents}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
                onEventDrop={handleEventDrop}
                viewMode={viewMode}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              {showEventForm && (
                <EventForm
                  event={selectedEvent}
                  selectedDate={selectedDate}
                  onSave={handleEventSave}
                  onCancel={() => {
                    setShowEventForm(false);
                    setSelectedEvent(null);
                    setSelectedDate(null);
                  }}
                />
              )}

              {selectedEvent && !showEventForm && (
                <EventDetails
                  event={selectedEvent}
                  onEdit={() => setShowEventForm(true)}
                  onDelete={() => handleEventDelete(selectedEvent.id)}
                  onClose={() => setSelectedEvent(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
