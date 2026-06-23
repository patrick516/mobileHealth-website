import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Mail, 
  MailCheck,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  ArrowRight,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import api from '../../config/api';

const COLORS = ['#0A6E3E', '#1A8A4E', '#F59E0B', '#1E40AF', '#EF4444'];

interface Stats {
  totalAdmins: number;
  totalBlogs: number;
  totalContacts: number;
  totalNewsletter: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalAdmins: 0,
    totalBlogs: 0,
    totalContacts: 0,
    totalNewsletter: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In production, fetch from API
      // const response = await api.get('/analytics/dashboard');
      // setStats(response.data.data);
      
      // Demo data
      setStats({
        totalAdmins: 12,
        totalBlogs: 45,
        totalContacts: 128,
        totalNewsletter: 356,
      });
      setActivityData([
        { name: 'Mon', visits: 45, contacts: 12 },
        { name: 'Tue', visits: 52, contacts: 8 },
        { name: 'Wed', visits: 38, contacts: 15 },
        { name: 'Thu', visits: 61, contacts: 10 },
        { name: 'Fri', visits: 48, contacts: 18 },
        { name: 'Sat', visits: 30, contacts: 6 },
        { name: 'Sun', visits: 22, contacts: 4 },
      ]);
      setStatusData([
        { name: 'Active', value: 8 },
        { name: 'Inactive', value: 4 },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { icon: Users, label: 'Admins', value: stats.totalAdmins, color: 'bg-primary/10 text-primary' },
    { icon: FileText, label: 'Blog Posts', value: stats.totalBlogs, color: 'bg-secondary/10 text-secondary' },
    { icon: Mail, label: 'Contacts', value: stats.totalContacts, color: 'bg-accent/10 text-accent' },
    { icon: MailCheck, label: 'Subscribers', value: stats.totalNewsletter, color: 'bg-success/10 text-success' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="text-text-secondary">Welcome back! Here's what's happening with your website.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-text mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success">+12%</span>
              <span className="text-text-light">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-text mb-4">Activity Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#0A6E3E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="contacts" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">Admin Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm text-text-secondary">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text">Recent Activity</h3>
          <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { user: 'John Doe', action: 'Published new blog post', time: '2 hours ago' },
            { user: 'Mary Smith', action: 'Replied to contact message', time: '4 hours ago' },
            { user: 'Peter Mwale', action: 'Added new admin user', time: '6 hours ago' },
            { user: 'Sarah Phiri', action: 'Updated website settings', time: '1 day ago' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{item.user}</p>
                  <p className="text-sm text-text-secondary">{item.action}</p>
                </div>
              </div>
              <span className="text-xs text-text-light">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
