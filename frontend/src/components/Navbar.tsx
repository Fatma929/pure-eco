import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useOrganization } from '../contexts/OrganizationContext';
import {
  LogOut,
  Menu,
  Sun,
  Moon,
  Building2,
  ChevronDown,
  Check
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { organizations, currentOrganization, switchOrganization } = useOrganization();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrgSwitcherOpen, setIsOrgSwitcherOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  const handleOrgSwitch = (orgId: string) => {
    switchOrganization(orgId);
    setIsOrgSwitcherOpen(false);
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between transition-colors duration-300">
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition"
        onClick={onToggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Logo/Title - visible on mobile */}
      <div className="md:hidden">
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">PureEco</h1>
      </div>

      {/* Center - Organization Switcher */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="relative">
          <button
            onClick={() => setIsOrgSwitcherOpen(!isOrgSwitcherOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
          >
            <Building2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {currentOrganization.name}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </button>

          {/* Organization Switcher Dropdown */}
          {isOrgSwitcherOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-slate-200 dark:border-slate-600">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Switch Organization
                </p>
              </div>
              <div className="py-1">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleOrgSwitch(org.id)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {org.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {org.location}
                      </p>
                    </div>
                    {currentOrganization.id === org.id && (
                      <Check className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: theme toggle, notifications and user menu */}
      <div className="flex items-center space-x-3 ml-auto">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <button className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors hidden sm:block">
          🔔
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {userInitial}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {user?.organizationName || user?.email}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-slate-200 dark:border-slate-600">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {user?.organizationName || user?.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;