import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryEvents = () => {
  // ... your state and useEffects unchanged ...

  const styles = {
    container: {
      padding: '60px 20px 40px', // Increased top padding and added horizontal padding for smaller screens
      backgroundColor: '#f4f7fc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      position: 'relative',
      boxSizing: 'border-box',
    },
    header: {
      fontSize: '32px',
      marginBottom: '30px',
      color: '#333',
      fontWeight: '600',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // default 3 columns
      gap: '20px',
      width: '100%',
      maxWidth: '1000px',
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      backgroundColor: '#fff',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      height: 'auto', // make height flexible for responsiveness
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'transform 0.4s ease',
      flexShrink: 0,
    },
    cardTitle: {
      fontSize: '20px',
      margin: '10px 0 8px',
      color: '#333',
      fontWeight: '500',
      flexGrow: 0,
    },
    description: {
      fontSize: '14px',
      marginBottom: '15px',
      color: '#666',
      flexGrow: 1,
    },
    link: {
      color: '#007BFF',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease',
      alignSelf: 'center',
      marginTop: 'auto',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
    },
    cardImageHover: {
      transform: 'scale(1.1)',
    },
    linkHover: {
      color: '#0056b3',
    },
    spinner: {
      display: 'inline-block',
      width: '80px',
      height: '80px',
      marginTop: '40px',
    },
    spinnerInner: {
      boxSizing: 'border-box',
      display: 'block',
      width: '64px',
      height: '64px',
      margin: '8px auto',
      border: '8px solid #007BFF',
      borderColor: '#007BFF transparent #007BFF transparent',
      borderRadius: '50%',
      animation: 'dual-ring 1.2s linear infinite',
    },
  };

  return (
    <div style={styles.container} onScroll={handleScroll}>
      <style>
        {`
          @keyframes dual-ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Responsive grid */
          @media (max-width: 900px) {
            .cardGrid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 600px) {
            .cardGrid {
              grid-template-columns: 1fr !important;
            }
            .card {
              height: auto !important;
            }
          }

          /* Add classes to your divs for responsive */
          /* Disable hover effects on touch devices */
          @media (hover: none) {
            .card:hover {
              transform: none !important;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
            }
            .card:hover img {
              transform: none !important;
            }
            a:hover {
              color: #007BFF !important;
            }
          }
        `}
      </style>

      <h3 style={styles.header}>Gallery Events</h3>

      {loading && page === 1 ? (
        <div style={styles.spinner}>
          <div style={styles.spinnerInner}></div>
        </div>
      ) : (
        <div className="cardGrid" style={styles.cardGrid}>
          {events.map((event) => (
            <div
              key={event._id}
              className="card"
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.cardHover.transform;
                e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = styles.cardImageHover.transform;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'none';
              }}
            >
              <img
                src={`https://jmgpc-backend.onrender.com${event.imageUrl}`}
                alt={event.title}
                style={styles.image}
              />
              <h4 style={styles.cardTitle}>{event.title}</h4>
              <p style={styles.description}>{event.description}</p>
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                  onMouseEnter={(e) => {
                    e.target.style.color = styles.linkHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = styles.link.color;
                  }}
                >
                  View More
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {loading && page > 1 && (
        <div style={styles.spinner}>
          <div style={styles.spinnerInner}></div>
        </div>
      )}
    </div>
  );
};

export default GalleryEvents;
