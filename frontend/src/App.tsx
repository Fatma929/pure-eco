import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import Integrations from './pages/Integrations';

const DataEntry = () => (
  <MainLayout>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Data Entry</h1>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30">
        <p className="text-slate-600 dark:text-slate-400">Data entry form will be implemented here.</p>
      </div>
    </div>
  </MainLayout>
);

const Reports = () => (
  <MainLayout>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Emissions Reports</h1>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30">
        <p className="text-slate-600 dark:text-slate-400">Reports dashboard will be implemented here.</p>
      </div>
    </div>
  </MainLayout>
);

const Settings = () => (
  <MainLayout>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30">
        <p className="text-slate-600 dark:text-slate-400">Application settings will be implemented here.</p>
      </div>
    </div>
  </MainLayout>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-entry"
            element={
              <ProtectedRoute>
                <DataEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/integrations"
            element={
              <ProtectedRoute>
                <Integrations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
