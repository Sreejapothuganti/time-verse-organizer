import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Event, RecurrencePattern, EVENT_COLORS } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvents } from '@/hooks/useEvents';
import { useToast } from '@/components/ui/use-toast';

interface EventFormProps {
  event?: Event | null;
  selectedDate?: Date | null;
  onSave: (eventData: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

export const EventForm = ({ event, selectedDate, onSave, onCancel }: EventFormProps) => {
  const { hasEventConflict } = useEvents();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    color: EVENT_COLORS[0].value,
    category: '',
    isRecurring: false,
    recurrenceType: 'daily' as 'daily' | 'weekly' | 'monthly' | 'custom',
    recurrenceInterval: 1,
    recurrenceEndDate: '',
    recurrenceOccurrences: 10,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        startDate: format(event.startTime, 'yyyy-MM-dd'),
        startTime: format(event.startTime, 'HH:mm'),
        endDate: format(event.endTime, 'yyyy-MM-dd'),
        endTime: format(event.endTime, 'HH:mm'),
        color: event.color,
        category: event.category || '',
        isRecurring: event.isRecurring,
        recurrenceType: event.recurrence?.type || 'daily',
        recurrenceInterval: event.recurrence?.interval || 1,
        recurrenceEndDate: event.recurrence?.endDate ? format(event.recurrence.endDate, 'yyyy-MM-dd') : '',
        recurrenceOccurrences: event.recurrence?.occurrences || 10,
      });
    } else if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      setFormData(prev => ({
        ...prev,
        startDate: dateStr,
        endDate: dateStr,
        startTime: '09:00',
        endTime: '10:00',
      }));
    }
  }, [event, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (endDateTime <= startDateTime) {
      toast({
        variant: 'destructive',
        title: 'Invalid Time Range',
        description: 'End time must be after start time.',
      });
      return;
    }

    let recurrence: RecurrencePattern | undefined;
    if (formData.isRecurring) {
      recurrence = {
        type: formData.recurrenceType,
        interval: formData.recurrenceInterval,
        endDate: formData.recurrenceEndDate ? new Date(formData.recurrenceEndDate) : undefined,
        occurrences: formData.recurrenceOccurrences,
      };
    }

    const eventData: Omit<Event, 'id'> = {
      title: formData.title,
      description: formData.description,
      startTime: startDateTime,
      endTime: endDateTime,
      color: formData.color,
      category: formData.category,
      isRecurring: formData.isRecurring,
      recurrence,
    };

    const conflict = hasEventConflict(eventData, event?.id);
    if (conflict) {
      toast({
        variant: 'destructive',
        title: 'Conflict Detected',
        description: 'This event overlaps with another event. Please pick a different time.',
      });
      return;
    }

    onSave(eventData);
  };

  return (
    <Card className="w-full" role="form" aria-labelledby="event-form-title">
      <CardHeader>
        <CardTitle id="event-form-title">
          {event ? 'Edit Event' : 'Create Event'}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              aria-required="true"
              aria-label="Event Title"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              aria-label="Description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
                aria-required="true"
                aria-label="Start Date"
              />
            </div>
            <div>
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
                aria-required="true"
                aria-label="Start Time"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
                aria-required="true"
                aria-label="End Date"
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                required
                aria-required="true"
                aria-label="End Time"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Work, Personal"
              aria-label="Category"
            />
          </div>

          <div>
            <Label>Event Color</Label>
            <div className="flex gap-2 mt-2">
              {EVENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ${
                    formData.color === color.value ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={formData.isRecurring}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRecurring: checked }))}
              aria-label="Toggle recurring event"
            />
            <Label htmlFor="recurring">Recurring Event</Label>
          </div>

          {formData.isRecurring && (
            <fieldset className="space-y-4 p-4 bg-gray-50 rounded-lg" aria-label="Recurring options">
              <div>
                <Label>Recurrence Type</Label>
                <Select
                  value={formData.recurrenceType}
                  onValueChange={(value: 'daily' | 'weekly' | 'monthly' | 'custom') =>
                    setFormData(prev => ({ ...prev, recurrenceType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="recurrenceInterval">Every</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="recurrenceInterval"
                    type="number"
                    min="1"
                    max="365"
                    value={formData.recurrenceInterval}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        recurrenceInterval: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-20"
                    aria-label="Recurrence Interval"
                  />
                  <span className="text-sm text-gray-600">
                    {formData.recurrenceType === 'daily' && 'day(s)'}
                    {formData.recurrenceType === 'weekly' && 'week(s)'}
                    {formData.recurrenceType === 'monthly' && 'month(s)'}
                    {formData.recurrenceType === 'custom' && 'day(s)'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recurrenceEndDate">End Date (optional)</Label>
                  <Input
                    id="recurrenceEndDate"
                    type="date"
                    value={formData.recurrenceEndDate}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, recurrenceEndDate: e.target.value }))
                    }
                    aria-label="Recurrence End Date"
                  />
                </div>
                <div>
                  <Label htmlFor="occurrences">Max Occurrences</Label>
                  <Input
                    id="occurrences"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.recurrenceOccurrences}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        recurrenceOccurrences: parseInt(e.target.value) || 10,
                      }))
                    }
                    aria-label="Max Occurrences"
                  />
                </div>
              </div>
            </fieldset>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" aria-label={event ? 'Update Event' : 'Create Event'}>
              {event ? 'Update Event' : 'Create Event'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} aria-label="Cancel">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
