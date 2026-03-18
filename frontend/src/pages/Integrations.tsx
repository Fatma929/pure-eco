import React, { useState } from 'react';
import MainLayout from '../components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import {
  Database,
  Cloud,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  RefreshCw
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: React.ComponentType<{ className?: string }>;
  status: 'connected' | 'configure' | 'syncing' | 'error';
  lastSynced?: string;
  category: string;
}

interface ConnectionCredentials {
  clientId: string;
  apiKey: string;
  environment: 'production' | 'sandbox';
}

interface ConnectionModalProps {
  integration: Integration | null;
  isOpen: boolean;
  onClose: () => void;
  onConnect: (credentials: ConnectionCredentials) => void;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({
  integration,
  isOpen,
  onClose,
  onConnect
}) => {
  const [credentials, setCredentials] = useState<ConnectionCredentials>({
    clientId: '',
    apiKey: '',
    environment: 'sandbox'
  });

  if (!isOpen || !integration) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(credentials);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <integration.logo className="w-8 h-8" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Connect to {integration.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {integration.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Client ID
              </label>
              <input
                type="text"
                value={credentials.clientId}
                onChange={(e) => setCredentials({...credentials, clientId: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your client ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={credentials.apiKey}
                onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your API key"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Environment
              </label>
              <select
                value={credentials.environment}
                onChange={(e) => setCredentials({...credentials, environment: e.target.value as 'production' | 'sandbox'})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
                <option value="sandbox">Sandbox</option>
                <option value="production">Production</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                Connect
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Integrations: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'sap',
      name: 'SAP',
      description: 'Enterprise Resource Planning system integration',
      logo: Database,
      status: 'configure',
      category: 'erp'
    },
    {
      id: 'oracle',
      name: 'Oracle',
      description: 'Database and cloud infrastructure integration',
      logo: Database,
      status: 'connected',
      lastSynced: '2024-01-15 14:30:00',
      category: 'database'
    },
    {
      id: 'dynamics',
      name: 'Microsoft Dynamics 365',
      description: 'CRM and ERP business applications',
      logo: Settings,
      status: 'syncing',
      lastSynced: '2024-01-15 14:25:00',
      category: 'erp'
    },
    {
      id: 'aws',
      name: 'AWS',
      description: 'Cloud computing and data services',
      logo: Cloud,
      status: 'connected',
      lastSynced: '2024-01-15 14:28:00',
      category: 'cloud'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
      case 'configure': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
      case 'syncing': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'error': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-slate-600 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'configure': return <AlertCircle className="w-4 h-4" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'configure': return 'Configure Now';
      case 'syncing': return 'Syncing';
      case 'error': return 'Connection Error';
      default: return 'Unknown';
    }
  };

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleConnect = (credentials: ConnectionCredentials) => {
    // In a real app, you would validate and store these credentials securely
    console.log('Connecting with credentials:', credentials);

    if (selectedIntegration) {
      setIntegrations(prev => prev.map(integration =>
        integration.id === selectedIntegration.id
          ? {
              ...integration,
              status: 'connected' as const,
              lastSynced: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
          : integration
      ));
    }
  };

  const handleSync = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;

    setIntegrations(prev => prev.map(integration =>
      integration.id === integrationId
        ? { ...integration, status: 'syncing' as const }
        : integration
    ));

    // Simulate sync completion after 3 seconds
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration =>
        integration.id === integrationId
          ? {
              ...integration,
              status: 'connected' as const,
              lastSynced: 'Just now'
            }
          : integration
      ));

      // Show success toast
      toast.success(`Data successfully pulled from ${integration.name}. 125 new emission records processed.`, {
        duration: 5000,
        position: 'top-right',
      });
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Integrations</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Connect your enterprise systems to automatically sync environmental data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {integrations.map((integration) => {
            const LogoIcon = integration.logo;
            return (
              <div
                key={integration.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <LogoIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {integration.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(integration.status)}`}>
                    {getStatusIcon(integration.status)}
                    <span>{getStatusText(integration.status)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {integration.lastSynced && (
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="w-4 h-4 mr-1" />
                      Last synced: {integration.lastSynced}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {integration.status === 'configure' ? (
                      <button
                        onClick={() => handleConfigure(integration)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configure</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSync(integration.id)}
                          disabled={integration.status === 'syncing'}
                          className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 disabled:opacity-50"
                        >
                          <RefreshCw className={`w-4 h-4 ${integration.status === 'syncing' ? 'animate-spin' : ''}`} />
                          <span>{integration.status === 'syncing' ? 'Syncing...' : 'Sync Now'}</span>
                        </button>
                        <button
                          onClick={() => handleConfigure(integration)}
                          className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                          title="Reconfigure"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Stats */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Integration Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {integrations.filter(i => i.status === 'connected').length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Connected Systems</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {integrations.filter(i => i.status === 'syncing').length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Currently Syncing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {integrations.filter(i => i.status === 'configure').length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Pending Setup</div>
            </div>
          </div>
        </div>
      </div>

      <ConnectionModal
        integration={selectedIntegration}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
      />
      <Toaster />
    </MainLayout>
  );
};

export default Integrations;