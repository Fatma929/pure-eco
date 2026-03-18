import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ThemeProvider } from '../contexts/ThemeContext';
import { OrganizationProvider } from '../contexts/OrganizationContext';

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <ThemeProvider>
      <OrganizationProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
          <div className={`transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          }`}>
            <Navbar onToggleSidebar={toggleSidebar} />
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </OrganizationProvider>
    </ThemeProvider>
  );
};

export default MainLayout;