import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Organization {
  id: string;
  name: string;
  type: 'main' | 'branch';
  location: string;
}

interface OrganizationContextType {
  organizations: Organization[];
  currentOrganization: Organization;
  switchOrganization: (orgId: string) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

// Mock data for organizations
const mockOrganizations: Organization[] = [
  {
    id: 'main-facility',
    name: 'Main Facility',
    type: 'main',
    location: 'Downtown HQ',
  },
  {
    id: 'secondary-branch',
    name: 'Secondary Branch',
    type: 'branch',
    location: 'Industrial District',
  },
];

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrganization, setCurrentOrganization] = useState<Organization>(() => {
    const stored = localStorage.getItem('currentOrganization');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fall back to default
      }
    }
    return mockOrganizations[0]; // Default to Main Facility
  });

  useEffect(() => {
    localStorage.setItem('currentOrganization', JSON.stringify(currentOrganization));
  }, [currentOrganization]);

  const switchOrganization = (orgId: string) => {
    const org = mockOrganizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
    }
  };

  const value: OrganizationContextType = {
    organizations: mockOrganizations,
    currentOrganization,
    switchOrganization,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = (): OrganizationContextType => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
