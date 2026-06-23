import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Mail,
  Settings,
  BarChart,
  BookOpen,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },

  { path: "/blog", icon: BookOpen, label: "Blog" },
  { path: "/contacts", icon: Mail, label: "Contacts" },
  { path: "/analytics", icon: BarChart, label: "Analytics" },
  { path: "/admins", icon: Users, label: "Users" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-primary-dark text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Logo - Replaced MH text with actual logo */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white/10">
            <img
              src="/images/logo.png"
              alt="MobileHealth Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-lg font-bold block">MobileHealth</span>
            <span className="text-xs text-white/60">Admin Panel</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
