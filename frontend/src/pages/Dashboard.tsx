import React from 'react';
import MainLayout from '../components/Layout';
import { Database, Droplets, Leaf } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Dashboard: React.FC = () => {
  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', water: 1200, carbon: 85, energy: 450 },
    { month: 'Feb', water: 1100, carbon: 78, energy: 420 },
    { month: 'Mar', water: 1350, carbon: 92, energy: 480 },
    { month: 'Apr', water: 1280, carbon: 88, energy: 460 },
    { month: 'May', water: 1420, carbon: 95, energy: 500 },
    { month: 'Jun', water: 1380, carbon: 90, energy: 475 },
  ];

  const categoryData = [
    { name: 'Water Usage', value: 35, color: '#06b6d4' },
    { name: 'Carbon Emissions', value: 28, color: '#f43f5e' },
    { name: 'Energy Consumption', value: 22, color: '#eab308' },
    { name: 'Waste Management', value: 15, color: '#22c55e' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back! Here's your environmental impact overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Database className="w-5 h-5 text-emerald-600 mr-2" />
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Total Data Points</h2>
                </div>
                <p className="text-3xl font-bold text-emerald-600">12,847</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Droplets className="w-5 h-5 text-cyan-500 mr-2" />
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Water Usage</h2>
                </div>
                <p className="text-3xl font-bold text-cyan-500">7,630 L</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">-5% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Leaf className="w-5 h-5 text-rose-500 mr-2" />
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Carbon Footprint</h2>
                </div>
                <p className="text-3xl font-bold text-rose-500">528 kg</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">-8% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Monthly Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="water" fill="#06b6d4" name="Water (L)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="carbon" fill="#f43f5e" name="Carbon (kg)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="energy" fill="#eab308" name="Energy (kWh)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Impact Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm shadow-slate-200/30 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Monthly Water Report Generated</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Data collection completed successfully</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Carbon Emission Analysis Updated</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">New calculation methodology applied</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">1 day ago</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Data Integration Summary</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">3 new data sources connected</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;