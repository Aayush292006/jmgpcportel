import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const [error, setError] = useState(null); // Error message state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is being submitted
    setError(null); // Reset any previous error

    try {
      const res = await fetch("https://jmgpc-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 3000); // Reset success message after 3 seconds
      } else {
        setError(data.message || 'Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setError('❌ Failed to send message. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">📞 Contact Us</h2>

        {success && (
          <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center mb-5">
            ✅ Message Sent Successfully!
          </p>
        )}

        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center mb-5">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold text-lg">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-lg">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading} // Disable the button when the request is loading
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : '✉️ Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
