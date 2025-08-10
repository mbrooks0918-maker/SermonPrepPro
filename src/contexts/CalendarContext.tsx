import React, { createContext, useContext, useState } from 'react';
import { CalendarEvent, CalendarContextType } from '@/types/calendar';

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const eventId = eventData.seriesId && eventData.type === 'sermon' 
      ? `${eventData.seriesId}-sermon-${eventData.title.replace(/\s+/g, '-').toLowerCase()}`
      : `${eventData.seriesId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Handle date properly to avoid timezone issues
    let dateString: string;
    if (typeof eventData.date === 'string') {
      // If it's already a string, use it as is
      dateString = eventData.date;
    } else {
      // Convert Date to local date string (YYYY-MM-DD format)
      const year = eventData.date.getFullYear();
      const month = String(eventData.date.getMonth() + 1).padStart(2, '0');
      const day = String(eventData.date.getDate()).padStart(2, '0');
      dateString = `${year}-${month}-${day}`;
    }
    
    const newEvent: CalendarEvent = {
      ...eventData,
      id: eventId,
      color: eventData.color || '#6366f1',
      date: dateString
    };
    
    setEvents(prev => {
      // Remove existing event with same ID to avoid duplicates
      const filtered = prev.filter(e => e.id !== eventId);
      return [...filtered, newEvent];
    });
  };

  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { 
        ...event, 
        ...updates,
        color: updates.color || event.color || '#6366f1'
      } : event
    ));
  };

  return (
    <CalendarContext.Provider value={{
      events,
      addEvent,
      removeEvent,
      updateEvent
    }}>
      {children}
    </CalendarContext.Provider>
  );
};