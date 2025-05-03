import React from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminNavbar from "./components/AdminNavbar";
import AdminFooter from "./components/AdminFooter";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import StudentSeating from "./pages/StudentSeating";
import Examseating from "./pages/Examseating"; // ✅ Added new route for Exam Seating
import Login from "./pages/Login"; // ✅ Login route retained

// Student Pages
import TimetableCardList from "./pages/TimetableCardList";
import TimetableProfile from "./pages/TimetableProfile";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AddStudent from "./pages/admin/AddStudent";
import ViewStudents from "./pages/admin/ViewStudents";
import AddRoom from "./pages/admin/AddRoom";
import Blueprint from "./pages/admin/Blueprint";
import AddGallery from "./pages/admin/AddGallery";
import StudentMessages from "./pages/admin/StudentMessages";
import ManageTimetable from "./pages/admin/ManageTimetable";
import ExamDataSeating from "./pages/admin/Examdataseating"; // ✅ Added new route for Exam Data Seating

// Utility function to check if the route is an admin route
const isAdminRoute = (path) => {
  const adminRoutes = [
    "/dashboard",
    "/admin/add-student",
    "/admin/view-students",
    "/admin/add-room",
    "/admin/blueprint",
    "/admin/add-gallery",
    "/admin/messages",
    "/admin/manage-timetable",
    "/admin/examdataseating", // ✅ Added the new admin route
  ];
  return adminRoutes.includes(path.toLowerCase());
};

const AppWrapper = () => {
  const location = useLocation();
  const isAdmin = isAdminRoute(location.pathname);

  return (
    <>
      {/* Render Navbar or Admin Navbar based on the route */}
      {isAdmin ? <AdminNavbar /> : <Navbar />}

      <div className="min-h-[100vh] flex flex-col justify-between bg-white">
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/studentseating" element={<StudentSeating />} />
            <Route path="/examseating" element={<Examseating />} /> {/* ✅ Added new route */}

            {/* Student Timetable Routes */}
            <Route path="/student/timetable" element={<TimetableCardList />} />
            <Route path="/student/timetable/:branch/:semester" element={<TimetableProfile />} />

            {/* Admin Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-student" element={<AddStudent />} />
            <Route path="/admin/view-students" element={<ViewStudents />} />
            <Route path="/admin/add-room" element={<AddRoom />} />
            <Route path="/admin/blueprint" element={<Blueprint />} />
            <Route path="/admin/add-gallery" element={<AddGallery />} />
            <Route path="/admin/messages" element={<StudentMessages />} />
            <Route path="/admin/manage-timetable" element={<ManageTimetable />} />
            <Route path="/admin/examdataseating" element={<ExamDataSeating />} /> {/* ✅ Added new route */}
          </Routes>
        </main>

        {/* Render Footer or Admin Footer based on the route */}
        {isAdmin ? <AdminFooter /> : <Footer />}
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
