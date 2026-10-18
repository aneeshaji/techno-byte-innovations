/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

interface LeadModalContextType {
  isOpen: boolean;
  servicePreset: string;
  openLeadModal: (preset?: string) => void;
  closeLeadModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export const LeadModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicePreset, setServicePreset] = useState('');

  const openLeadModal = (preset: string = '') => {
    setServicePreset(preset);
    setIsOpen(true);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
    setServicePreset('');
  };

  return (
    <LeadModalContext.Provider value={{ isOpen, servicePreset, openLeadModal, closeLeadModal }}>
      {children}
    </LeadModalContext.Provider>
  );
};

export const useLeadModal = () => {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider');
  }
  return context;
};
