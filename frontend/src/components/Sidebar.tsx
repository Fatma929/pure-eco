import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  FileBarChart,
  Plug,
  Settings,
  Leaf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/', label: 'Dashboard' },
    { name: 'Data Entry', icon: Database, href: '/data-entry', label: 'Data Entry' },
    { name: 'Emissions Reports', icon: FileBarChart, href: '/reports', label: 'Reports' },
    { name: 'Integrations', icon: Plug, href: '/integrations', label: 'Integrations' },
    { name: 'Settings', icon: Settings, href: '/settings', label: 'Settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-slate-900 dark:bg-slate-800 text-slate-100 transform transition-all duration-300 ease-in-out z-50 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${isCollapsed ? 'translate-x-0' : 'translate-x-0'} md:translate-x-0 md:static md:inset-0 border-r border-slate-700 dark:border-slate-600`}
      >
        <div className="p-4">
          {/* Logo and Toggle */}
          <div className={`flex items-center justify-between mb-8 ${isCollapsed ? 'flex-col space-y-4' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <h2 className="text-xl font-bold text-slate-100">PureEco</h2>
              )}
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors group"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                        active
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'hover:bg-slate-800 dark:hover:bg-slate-700 text-slate-300 hover:text-slate-100'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                    >
                      {active && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-r-full"></div>
                      )}
                      <Icon className={`w-5 h-5 transition-colors ${
                        isCollapsed ? '' : 'mr-3'
                      } ${
                        active
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`} />
                      {!isCollapsed && (
                        <span className={`font-medium transition-opacity duration-200 ${
                          active ? 'text-white' : 'text-slate-300 group-hover:text-slate-100'
                        }`}>
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;