
import { useState, useEffect } from 'react';
import { Event, RecurrencePattern } from '@/types/event';
import { addDays, addWeeks, addMonths, isAfter, isBefore, format } from 'date-fns';

const STORAGE_KEY = 'calendar-events';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
        ...event,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
        recurrence: event.recurrence ? {
          ...event.recurrence,
          endDate: event.recurrence.endDate ? new Date(event.recurrence.endDate) : undefined
        } : undefined
      }));
      setEvents(generateRecurringEvents(parsedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    const baseEvents = events.filter(event => !event.originalEventId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(baseEvents));
  }, [events]);

  const generateRecurringEvents = (baseEvents: Event[]): Event[] => {
    const allEvents: Event[] = [...baseEvents];
    const today = new Date();
    const futureLimit = addMonths(today, 12); // Generate events for next 12 months

    baseEvents.forEach(event => {
      if (!event.isRecurring || !event.recurrence) return;

      const instances = generateRecurrenceInstances(event, today, futureLimit);
      allEvents.push(...instances);
    });

    return allEvents;
  };

  const generateRecurrenceInstances = (
    baseEvent: Event, 
    startDate: Date, 
    endDate: Date
  ): Event[] => {
    const instances: Event[] = [];
    const { recurrence } = baseEvent;
    if (!recurrence) return instances;

    let currentDate = new Date(baseEvent.startTime);
    let instanceCount = 0;

    while (
      isBefore(currentDate, endDate) && 
      (!recurrence.endDate || isBefore(currentDate, recurrence.endDate)) &&
      (!recurrence.occurrences || instanceCount < recurrence.occurrences)
    ) {
      // Skip the original event date
      if (currentDate.getTime() !== baseEvent.startTime.getTime()) {
        const duration = baseEvent.endTime.getTime() - baseEvent.startTime.getTime();
        const newEndTime = new Date(currentDate.getTime() + duration);

        instances.push({
          ...baseEvent,
          id: `${baseEvent.id}-${format(currentDate, 'yyyy-MM-dd')}`,
          startTime: new Date(currentDate),
          endTime: newEndTime,
          originalEventId: baseEvent.id,
        });
      }

      currentDate = getNextRecurrenceDate(currentDate, recurrence);
      instanceCount++;

      // Safety check to prevent infinite loops
      if (instanceCount > 1000) break;
    }

    return instances;
  };

  const getNextRecurrenceDate = (date: Date, recurrence: RecurrencePattern): Date => {
    switch (recurrence.type) {
      case 'daily':
        return addDays(date, recurrence.interval);
      case 'weekly':
        return addWeeks(date, recurrence.interval);
      case 'monthly':
        return addMonths(date, recurrence.interval);
      case 'custom':
        return addDays(date, recurrence.interval);
      default:
        return addDays(date, 1);
    }
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    setEvents(prev => {
      const baseEvents = prev.filter(e => !e.originalEventId);
      const updatedBaseEvents = [...baseEvents, newEvent];
      return generateRecurringEvents(updatedBaseEvents);
    });
  };

  const updateEvent = (eventId: string, eventData: Partial<Event>) => {
    setEvents(prev => {
      const baseEvents = prev.filter(e => !e.originalEventId);
      const updatedBaseEvents = baseEvents.map(event =>
        event.id === eventId ? { ...event, ...eventData } : event
      );
      return generateRecurringEvents(updatedBaseEvents);
    });
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => {
      const baseEvents = prev.filter(e => !e.originalEventId && e.id !== eventId);
      return generateRecurringEvents(baseEvents);
    });
  };

  const searchEvents = (searchTerm: string): Event[] => {
    if (!searchTerm.trim()) return events;
    
    return events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => {
      const eventDate = format(event.startTime, 'yyyy-MM-dd');
      const targetDate = format(date, 'yyyy-MM-dd');
      return eventDate === targetDate;
    });
  };

  const hasEventConflict = (newEvent: Omit<Event, 'id'>, excludeEventId?: string): boolean => {
    const dateEvents = getEventsForDate(newEvent.startTime).filter(e => 
      excludeEventId ? e.id !== excludeEventId : true
    );

    return dateEvents.some(event => {
      const newStart = newEvent.startTime.getTime();
      const newEnd = newEvent.endTime.getTime();
      const existingStart = event.startTime.getTime();
      const existingEnd = event.endTime.getTime();

      return (newStart < existingEnd && newEnd > existingStart);
    });
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    searchEvents,
    getEventsForDate,
    hasEventConflict,
  };
};
