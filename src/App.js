
// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminNavbar from "./components/AdminNavbar";
import AdminFooter from "./components/AdminFooter";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import StudentSeating from "./pages/StudentSeating";
import Examseating from "./pages/Examseating";
import Login from "./pages/Login";
import TimetableCardList from "./pages/TimetableCardList";
import TimetableProfile from "./pages/TimetableProfile";
import Dashboard from "./pages/admin/Dashboard";
import AddStudent from "./pages/admin/AddStudent";
import ViewStudents from "./pages/admin/ViewStudents";
import AddRoom from "./pages/admin/AddRoom";
import Blueprint from "./pages/admin/Blueprint";
import AddGallery from "./pages/admin/AddGallery";
import StudentMessages from "./pages/admin/StudentMessages";
import ManageTimetable from "./pages/admin/ManageTimetable";
import ExamDataSeating from "./pages/admin/Examdataseating";

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
    "/admin/examdataseating"
  ];
  return adminRoutes.includes(path.toLowerCase());
};

const AppWrapper = () => {
  const location = useLocation();
  const isAdmin = isAdminRoute(location.pathname);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return <SplashScreen />;

  return (
    <>
      {isAdmin ? <AdminNavbar /> : <Navbar />}

      <div className="min-h-[100vh] flex flex-col justify-between bg-white">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/studentseating" element={<StudentSeating />} />
            <Route path="/examseating" element={<Examseating />} />
            <Route path="/student/timetable" element={<TimetableCardList />} />
            <Route
              path="/student/timetable/:branch/:semester"
              element={<TimetableProfile />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-student" element={<AddStudent />} />
            <Route path="/admin/view-students" element={<ViewStudents />} />
            <Route path="/admin/add-room" element={<AddRoom />} />
            <Route path="/admin/blueprint" element={<Blueprint />} />
            <Route path="/admin/add-gallery" element={<AddGallery />} />
            <Route path="/admin/messages" element={<StudentMessages />} />
            <Route path="/admin/manage-timetable" element={<ManageTimetable />} />
            <Route path="/admin/examdataseating" element={<ExamDataSeating />} />
          </Routes>
        </main>
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
//https://jmgpcportel.netlify.app
//https://jmgpc-backend.onrender.com