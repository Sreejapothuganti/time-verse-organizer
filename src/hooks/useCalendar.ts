
import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  return {
    currentDate,
    setCurrentDate,
    navigateMonth,
  };
};
