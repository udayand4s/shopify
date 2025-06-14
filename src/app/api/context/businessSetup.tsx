import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BusinessInfo {
  name: string;
  logo: string;
  location: string;
}

interface BusinessContextType {
  businessInfo: BusinessInfo;
  updateBusinessInfo: (info: Partial<BusinessInfo>) => void;
  selectedTemplate: string | null;
  selectTemplate: (templateId: string) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    logo: '',
    location: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const updateBusinessInfo = (info: Partial<BusinessInfo>) => {
    setBusinessInfo(prev => ({ ...prev, ...info }));
  };

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const value = {
    businessInfo,
    updateBusinessInfo,
    selectedTemplate,
    selectTemplate
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};