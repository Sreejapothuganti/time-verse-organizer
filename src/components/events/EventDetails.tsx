import { format } from 'date-fns';
import { Event } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag, Repeat, Trash, Edit } from 'lucide-react';

interface EventDetailsProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const EventDetails = ({ event, onEdit, onDelete, onClose }: EventDetailsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{event.title}</CardTitle>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="text-gray-400 hover:text-gray-600 text-xl focus:outline-none"
          >
            &times;
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event color bar */}
        <div
          className="w-full h-3 rounded-full transition-all"
          style={{ backgroundColor: event.color }}
        />

        {/* Event info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{format(event.startTime, 'EEEE, MMMM d, yyyy')}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {format(event.startTime, 'h:mm a')} – {format(event.endTime, 'h:mm a')}
            </span>
          </div>

          {event.category && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Tag className="h-4 w-4" />
              <Badge variant="secondary">{event.category}</Badge>
            </div>
          )}

          {event.isRecurring && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Repeat className="h-4 w-4" />
              <span>
                Repeats {event.recurrence?.type}
                {event.recurrence?.interval && event.recurrence.interval > 1
                  ? ` (every ${event.recurrence.interval})`
                  : ''}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Description</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        )}

        {/* Recurring note */}
        {event.originalEventId && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              This is a recurring event instance. Changes will only affect this occurrence.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button onClick={onEdit} variant="outline" className="flex-1 hover:bg-gray-100">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button onClick={onDelete} variant="destructive" className="flex-1">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
