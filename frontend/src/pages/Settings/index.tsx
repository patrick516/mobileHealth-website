import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { settingApi } from "../../services/apiService";
import {
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Settings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

export const Settings: React.FC = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    siteName: "",
    siteDescription: "",
    siteLogo: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingApi.getAll();
      if (response.data?.success && response.data.data) {
        const settingsObj: any = {};
        response.data.data.forEach((item: any) => {
          settingsObj[item.key] = item.value;
        });
        setSettings(settingsObj);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const promises = Object.entries(settings).map(([key, value]) =>
        settingApi.update(key, value),
      );
      await Promise.all(promises);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Settings</h1>
          <p className="text-text-secondary">Manage your site settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Globe size={20} className="text-primary" />
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName || ""}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Site Description
              </label>
              <textarea
                rows={3}
                value={settings.siteDescription || ""}
                onChange={(e) =>
                  handleChange("siteDescription", e.target.value)
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Site Logo URL
              </label>
              <input
                type="text"
                value={settings.siteLogo || ""}
                onChange={(e) => handleChange("siteLogo", e.target.value)}
                className="input w-full"
                placeholder="/images/logo.png"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Mail size={20} className="text-primary" />
            Contact Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail || ""}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={settings.contactPhone || ""}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Address
              </label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                className="input w-full"
              />
            </div>
          </div>
        </div>

        {/* Social Settings */}
        <div className="card md:col-span-2">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            Social Media Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                <Facebook size={16} className="inline mr-1 text-blue-600" />
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebook || ""}
                onChange={(e) => handleChange("facebook", e.target.value)}
                className="input w-full"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                <Twitter size={16} className="inline mr-1 text-blue-400" />
                Twitter URL
              </label>
              <input
                type="url"
                value={settings.twitter || ""}
                onChange={(e) => handleChange("twitter", e.target.value)}
                className="input w-full"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                <Instagram size={16} className="inline mr-1 text-pink-600" />
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram || ""}
                onChange={(e) => handleChange("instagram", e.target.value)}
                className="input w-full"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                <Youtube size={16} className="inline mr-1 text-red-600" />
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube || ""}
                onChange={(e) => handleChange("youtube", e.target.value)}
                className="input w-full"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
