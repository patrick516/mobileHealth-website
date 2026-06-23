import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { contactApi } from "../../services/apiService";
import { Eye, Reply, Trash2, Loader2, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "NEW" | "READ" | "REPLIED";
  createdAt: string;
  repliedAt?: string;
  replyMessage?: string;
}

export const Contacts: React.FC = () => {
  const { token } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactApi.getAll();
      if (response.data?.success) {
        setContacts(response.data.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;
    setSendingReply(true);
    try {
      await contactApi.reply(selectedContact.id, { replyMessage });
      toast.success("Reply sent successfully");
      setShowDetail(false);
      setSelectedContact(null);
      setReplyMessage("");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      try {
        await contactApi.delete(id);
        toast.success("Message deleted successfully");
        fetchContacts();
      } catch (error) {
        toast.error("Failed to delete message");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      NEW: "bg-yellow-100 text-yellow-700",
      READ: "bg-blue-100 text-blue-700",
      REPLIED: "bg-green-100 text-green-700",
    };
    return badges[status as keyof typeof badges] || badges.NEW;
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
          <h1 className="text-2xl font-bold text-text">Contacts</h1>
          <p className="text-text-secondary">Manage contact form submissions</p>
        </div>
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
                Subject
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Status
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
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="px-4 py-3 text-sm text-text font-medium">
                  {contact.name}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {contact.email}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {contact.subject}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(contact.status)}`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowDetail(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowDetail(true);
                      }}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Reply size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
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

      {/* Detail/Reply Modal */}
      {showDetail && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text">Contact Details</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <User size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text">
                    {selectedContact.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {selectedContact.email}
                  </p>
                </div>
              </div>
              {selectedContact.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <p className="text-sm text-text-secondary">
                    {selectedContact.phone}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <p className="text-sm font-medium text-text">
                  {selectedContact.subject}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-text-secondary whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
              {selectedContact.replyMessage && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs text-green-700 font-medium mb-1">
                    Reply sent:
                  </p>
                  <p className="text-sm text-text-secondary">
                    {selectedContact.replyMessage}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <textarea
                rows={3}
                placeholder="Type your reply here..."
                className="input w-full"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                disabled={selectedContact.status === "REPLIED"}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDetail(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-text-secondary hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedContact.status !== "REPLIED" && (
                  <button
                    onClick={handleReply}
                    disabled={sendingReply || !replyMessage.trim()}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {sendingReply ? "Sending..." : "Send Reply"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
