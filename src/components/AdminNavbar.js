import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/admin/add-student", label: "Add Student" },
    { to: "/admin/view-students", label: "View Students" },
    { to: "/admin/add-room", label: "Add Room" },
    { to: "/admin/blueprint", label: "Blueprint" },
    { to: "/admin/add-gallery", label: "Add Gallery" },
    { to: "/admin/messages", label: "Messages" },
    { to: "/admin/manage-timetable", label: "Manage Timetable" },
    { to: "/admin/examdataseating", label: "Exam Data Seating" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold animate-pulse">🏫 Admin Panel</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Logout */}
        <div className="hidden md:flex">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          >
            <LogOut className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
            <span className="tracking-wide font-medium">Logout</span>
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-indigo-700/90 backdrop-blur-sm rounded-b-lg">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-md text-sm font-medium ${
                  isActive ? "bg-yellow-400 text-black" : "hover:bg-white hover:text-black"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full shadow-md transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
