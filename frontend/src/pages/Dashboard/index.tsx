// src/pages/Dashboard/index.tsx
import React, { useState, useEffect } from "react";
import { analyticsApi } from "../../services/apiService";
import {
  Users,
  FileText,
  Mail,
  Star,
  TrendingUp,
  TrendingDown,
  Loader2,
  Eye,
  MessageCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";

interface DashboardStats {
  totals: {
    pageViews: number;
    downloads: number;
  };
  today: {
    pageViews: number;
    downloads: number;
  };
  periods: {
    week: number;
    month: number;
  };
  topPages: { _id: string; count: number }[];
  recentActivity: any[];
}

const StatCard: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}> = ({ label, value, icon, color, trend }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {trend > 0 ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )}
            <span
              className={`text-xs ${
                trend > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend > 0 ? "+" : ""}
              {trend}% from last month
            </span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await analyticsApi.getStats();
      console.log("Dashboard API response:", response);

      if (response.data?.success) {
        setStats(response.data.data);
      } else {
        setError(response.data?.message || "Failed to load dashboard data");
      }
    } catch (err: any) {
      console.error("Dashboard error:", err);
      setError(err.message || "Network error - check if backend is running");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <p className="text-red-600 mb-3">⚠️ {error}</p>
        <p className="text-sm text-gray-500 mb-4">
          Make sure your backend is running on port 5001
        </p>
        <button
          onClick={fetchDashboardData}
          className="btn-primary text-sm px-4 py-2"
        >
          Retry
        </button>
      </div>
    );
  }

  // Prepare chart data from topPages
  const chartData =
    stats?.topPages?.map((page, index) => ({
      name: page._id || `Page ${index + 1}`,
      views: page.count || 0,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-text-secondary">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Stats Cards with Primary colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Page Views"
          value={stats?.totals?.pageViews || 0}
          icon={<Eye className="w-5 h-5 text-white" />}
          color="bg-primary"
          trend={12}
        />
        <StatCard
          label="Today's Views"
          value={stats?.today?.pageViews || 0}
          icon={<Users className="w-5 h-5 text-white" />}
          color="bg-primary-dark"
          trend={8}
        />
        <StatCard
          label="Downloads"
          value={stats?.totals?.downloads || 0}
          icon={<FileText className="w-5 h-5 text-white" />}
          color="bg-secondary"
          trend={-3}
        />
        <StatCard
          label="This Week"
          value={stats?.periods?.week || 0}
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          color="bg-primary-light"
          trend={5}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">Top Pages</h3>
          {chartData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center text-gray-400">
              No page data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={chartData.slice(0, 10)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#0A6E3E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-text mb-4">
            Recent Activity
          </h3>
          {stats?.recentActivity?.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center text-gray-400">
              No recent activity
            </div>
          ) : (
            <div className="space-y-3 max-h-[280px] overflow-y-auto">
              {stats?.recentActivity
                ?.slice(0, 10)
                .map((activity: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-text">
                        {activity.page || "Unknown page"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {activity.type}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
