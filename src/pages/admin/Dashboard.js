import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "➕ Add Student",
      description: "Add a new student to the database.",
      route: "/admin/add-student",
    },
    {
      title: "📋 View Students",
      description: "View and manage all registered students.",
      route: "/admin/view-students",
    },
    {
      title: "🏫 Add Room",
      description: "Add and manage classroom details.",
      route: "/admin/add-room",
    },
    {
      title: "🗺️ Blueprint",
      description: "Design classroom seating arrangements.",
      route: "/admin/blueprint",
    },
    {
      title: "🖼️ Add Gallery",
      description: "Upload college event photos.",
      route: "/admin/add-gallery",
    },
    {
      title: "💬 Messages",
      description: "View and reply to student messages.",
      route: "/admin/messages",
    },
    {
      title: "🗓️ Manage Timetable", // ✅ New Card
      description: "Create and manage exam timetables by branch & semester.",
      route: "/admin/manage-timetable",
    },
    {
      title: "🖥️ Exam Data Seating", // ✅ New Card
      description: "Manage exam seating arrangements and data.",
      route: "/admin/examdataseating",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">👋 Welcome, Admin</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-xl p-6 shadow-lg cursor-pointer hover:bg-blue-50 transition duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
