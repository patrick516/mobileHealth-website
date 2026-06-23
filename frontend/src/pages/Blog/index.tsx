import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { blogApi } from "../../services/apiService";
import { Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  category?: string;
  views: number;
  createdAt: string;
  publishedAt?: string;
  author: { name: string };
}

export const Blog: React.FC = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "DRAFT",
    tags: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await blogApi.getAll();
      if (response.data?.success) {
        setPosts(response.data.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (editingPost) {
        await blogApi.update(editingPost.id, data);
        toast.success("Post updated successfully");
      } else {
        await blogApi.create(data);
        toast.success("Post created successfully");
      }
      setShowModal(false);
      setEditingPost(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        status: "DRAFT",
        tags: "",
      });
      fetchPosts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await blogApi.delete(id);
        toast.success("Post deleted successfully");
        fetchPosts();
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      DRAFT: "bg-gray-100 text-gray-700",
      PUBLISHED: "bg-green-100 text-green-700",
      ARCHIVED: "bg-red-100 text-red-700",
    };
    return badges[status as keyof typeof badges] || badges.DRAFT;
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
          <h1 className="text-2xl font-bold text-text">Blog Posts</h1>
          <p className="text-text-secondary">Manage your blog content</p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setFormData({
              title: "",
              excerpt: "",
              content: "",
              category: "",
              status: "DRAFT",
              tags: "",
            });
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          New Post
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Views
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Date
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3 text-sm text-text font-medium">
                  {post.title}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {post.category || "Uncategorized"}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(post.status)}`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {post.views}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setFormData({
                          title: post.title,
                          excerpt: post.excerpt || "",
                          content: "",
                          category: post.category || "",
                          status: post.status,
                          tags: "",
                        });
                        setShowModal(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-text mb-4">
              {editingPost ? "Edit Post" : "New Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="input w-full"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Excerpt
                </label>
                <textarea
                  rows={2}
                  className="input w-full"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Content
                </label>
                <textarea
                  rows={5}
                  required
                  className="input w-full"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Status
                  </label>
                  <select
                    className="input w-full"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="health, technology, community"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
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
                  {editingPost ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
