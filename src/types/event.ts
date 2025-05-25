
export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  color: string;
  category?: string;
  recurrence?: RecurrencePattern;
  isRecurring: boolean;
  originalEventId?: string; // For recurring event instances
}

export interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  interval: number; // e.g., every 2 weeks
  daysOfWeek?: number[]; // For weekly recurrence (0 = Sunday, 1 = Monday, etc.)
  dayOfMonth?: number; // For monthly recurrence
  endDate?: Date;
  occurrences?: number;
}

export const EVENT_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F59E0B' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Indigo', value: '#6366F1' },
];
