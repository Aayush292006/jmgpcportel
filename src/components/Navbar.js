import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu if switching to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkStyles = {
    color: "white",
    textDecoration: "none",
    fontSize: "1.1rem",
  };

  const navLinks = (
    <>
      <li><NavLink to="/" style={navLinkStyles} onClick={() => setIsOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/about" style={navLinkStyles} onClick={() => setIsOpen(false)}>About</NavLink></li>
      <li><NavLink to="/gallery" style={navLinkStyles} onClick={() => setIsOpen(false)}>Gallery</NavLink></li>
      <li><NavLink to="/contact" style={navLinkStyles} onClick={() => setIsOpen(false)}>Contact</NavLink></li>
      <li><NavLink to="/studentseating" style={navLinkStyles} onClick={() => setIsOpen(false)}>Exam Timetable</NavLink></li>
      <li><NavLink to="/examseating" style={navLinkStyles} onClick={() => setIsOpen(false)}>Exam Seating</NavLink></li>
    </>
  );

  return (
    <div>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#2d3e50",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000",
        width: "100%",
      }}>
        <div style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
          JMGPC PORTAL
        </div>

        {/* Hamburger icon for mobile */}
        {isMobile && (
          <div onClick={toggleMenu} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "25px",
            height: "20px",
            cursor: "pointer",
          }}>
            <div style={{
              height: "3px",
              backgroundColor: "white",
              transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              transition: "all 0.3s",
            }} />
            <div style={{
              height: "3px",
              backgroundColor: "white",
              opacity: isOpen ? 0 : 1,
              transition: "all 0.3s",
            }} />
            <div style={{
              height: "3px",
              backgroundColor: "white",
              transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              transition: "all 0.3s",
            }} />
          </div>
        )}

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none" }}>
            {navLinks}
          </ul>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && isOpen && (
        <div style={{
          position: "absolute",
          top: "70px",
          left: "0",
          right: "0",
          backgroundColor: "#2d3e50",
          padding: "1rem",
          zIndex: "999",
        }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {navLinks}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
