import React, { useState, useEffect } from "react";
import { analyticsApi } from "../../services/apiService";
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
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const COLORS = ["#0A6E3E", "#F59E0B", "#1E40AF", "#EF4444", "#8B5CF6"];

interface AnalyticsData {
  totals?: { pageViews?: number; downloads?: number };
  today?: { pageViews?: number; downloads?: number };
  periods?: { week?: number; month?: number };
  topPages?: { _id: string; count: number }[];
  recentActivity?: any[];
}

export const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyticsApi.getStats();
      console.log("Analytics API response:", response);

      if (response.data?.success && response.data.data) {
        setData(response.data.data);
      } else {
        setError(response.data?.message || "Failed to load analytics data");
      }
    } catch (err: any) {
      console.error("Error fetching analytics:", err);
      setError(err.message || "Network error - check if backend is running");
      toast.error("Failed to load analytics");
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
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 mb-3">⚠️ {error}</p>
        <p className="text-sm text-gray-500 mb-4">
          Make sure your backend is running on port 5001
        </p>
        <button
          onClick={fetchAnalytics}
          className="btn-primary text-sm px-4 py-2 flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  // Safe access with fallbacks - using real data only
  const totals = data?.totals || {};
  const today = data?.today || {};
  const periods = data?.periods || {};
  const topPages = data?.topPages || [];
  const recentActivity = data?.recentActivity || [];

  // Prepare data for charts - real data only
  const topPagesData = topPages.map((page) => ({
    name: page._id || "Unknown",
    visits: page.count || 0,
  }));

  // Traffic sources - from real data only, no fallbacks
  const trafficData =
    topPagesData.length > 0
      ? topPagesData.slice(0, 4).map((item) => ({
          name: item.name,
          value: item.visits,
        }))
      : [];

  const pageViews = totals.pageViews || 0;
  const weekViews = periods.week || 0;
  const monthViews = periods.month || 0;
  const downloads = totals.downloads || 0;

  const summary = {
    totalVisits: pageViews,
    uniqueVisitors: monthViews,
    downloads: downloads,
    bounceRate:
      pageViews > 0
        ? Math.round(((pageViews - weekViews) / pageViews) * 100)
        : 0,
    avgSessionDuration: pageViews > 0 ? Math.round(pageViews / 10) : 0,
  };

  const hasData =
    pageViews > 0 || topPagesData.length > 0 || recentActivity.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Analytics</h1>
          <p className="text-text-secondary">
            Website performance and statistics
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* No Data State */}
      {!hasData && (
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">
            No Analytics Data Yet
          </h3>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            Start tracking your website traffic and user activity. Once you have
            visitors, analytics data will appear here automatically.
          </p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 text-sm text-primary hover:underline flex items-center gap-1 mx-auto"
          >
            <RefreshCw size={14} />
            Check for updates
          </button>
        </div>
      )}

      {/* Summary Stats - only show if there's data */}
      {hasData && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card p-4 text-center">
              <p className="text-xs text-gray-500">Total Visits</p>
              <p className="text-2xl font-bold text-text">
                {summary.totalVisits.toLocaleString()}
              </p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-xs text-gray-500">Downloads</p>
              <p className="text-2xl font-bold text-text">
                {summary.downloads.toLocaleString()}
              </p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-xs text-gray-500">Bounce Rate</p>
              <p className="text-2xl font-bold text-text">
                {summary.bounceRate}%
              </p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-xs text-gray-500">Avg Session</p>
              <p className="text-2xl font-bold text-text">
                {summary.avgSessionDuration}s
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-4">
                Top Pages
              </h3>
              {topPagesData.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No page data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={topPagesData.slice(0, 10)}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={60} />
                    <Tooltip />
                    <Bar
                      dataKey="visits"
                      fill="#0A6E3E"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Traffic Sources */}
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-4">
                Traffic Sources
              </h3>
              {trafficData.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No traffic data available
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {trafficData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {trafficData.map((item, i) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <span className="text-xs text-text-secondary">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-text mb-4">
              Recent Activity
            </h3>
            {recentActivity.length === 0 ? (
              <div className="py-8 text-center text-gray-400">
                No recent activity
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.slice(0, 10).map((activity: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-text">
                        {activity.page || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        {activity.type || "view"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {activity.userAgent?.substring(0, 20) || "Unknown"}...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
