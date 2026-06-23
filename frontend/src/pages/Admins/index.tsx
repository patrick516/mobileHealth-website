import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminApi } from "../../services/apiService";
import { Plus, Edit, Trash2, UserPlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export const Admins: React.FC = () => {
  const { token } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await adminApi.getAll();
      if (response.data?.success) {
        setAdmins(response.data.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAdmin) {
        await adminApi.update(editingAdmin.id, formData);
        toast.success("Admin updated successfully");
      } else {
        await adminApi.create(formData);
        toast.success("Admin created successfully");
      }
      setShowModal(false);
      setEditingAdmin(null);
      setFormData({ fullName: "", email: "", password: "", role: "ADMIN" });
      fetchAdmins();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      try {
        await adminApi.delete(id);
        toast.success("Admin deleted successfully");
        fetchAdmins();
      } catch (error) {
        toast.error("Failed to delete admin");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Admins</h1>
          <p className="text-text-secondary">Manage admin users</p>
        </div>
        <button
          onClick={() => {
            setEditingAdmin(null);
            setFormData({
              fullName: "",
              email: "",
              password: "",
              role: "ADMIN",
            });
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add Admin
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Created
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-4 py-3 text-sm text-text">
                  {admin.fullName}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {admin.email}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      admin.role === "SUPER_ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {admin.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingAdmin(admin);
                        setFormData({
                          fullName: admin.fullName,
                          email: admin.email,
                          password: "",
                          role: admin.role,
                        });
                        setShowModal(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-text mb-4">
              {editingAdmin ? "Edit Admin" : "Add New Admin"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="input w-full"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="input w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {!editingAdmin && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required={!editingAdmin}
                    className="input w-full"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Role
                </label>
                <select
                  className="input w-full"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-text-secondary hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingAdmin ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
