'use client';

import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
  isOpen: boolean;
  selectedService: string;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  setSelectedService: (serviceId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('wash-fold');

  const openBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedService(serviceId);
    }
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        selectedService,
        openBooking,
        closeBooking,
        setSelectedService,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
