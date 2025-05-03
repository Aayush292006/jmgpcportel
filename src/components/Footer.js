import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container animate-slide-fade-in">
      <div className="footer-content">
        <div className="footer-top">
          <h3 className="footer-logo">JMGPC PORTAL</h3>
          <div className="footer-contact">
            <span>Email: <a href="mailto:jmgpc@mp.gov.in">jmgpc@mp.gov.in</a></span>
            <span>Phone: <a href="tel:+919876543210">+91-9876543210</a></span>
          </div>
        </div>

        <ul className="footer-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-footer-link" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-footer-link" : ""}>About</NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? "active-footer-link" : ""}>Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-footer-link" : ""}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/StudentSeating" className={({ isActive }) => isActive ? "active-footer-link" : ""}>Exam Timetable</NavLink>
          </li>
          <li>
            <NavLink to="/Examseating" className={({ isActive }) => isActive ? "active-footer-link" : ""}>Exam Seating</NavLink>
          </li>
        </ul>

        <p className="footer-copy">© {new Date().getFullYear()} Jija Mata Government Polytechnic College. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
