import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 🔄 Loader state

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get("http://localhost:3000/api/contact");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to fetch messages. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/contact/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete message. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">📬 Student Messages</h2>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages received yet.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-indigo-700">{msg.name}</h3>
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-500 hover:underline"
                >
                  ❌ Delete
                </button>
              </div>
              <p className="text-gray-600 text-sm">📧 {msg.email}</p>
              <p className="mt-2 text-gray-800">{msg.message}</p>
              <p className="mt-1 text-right text-sm text-gray-400">
                🕒 {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
