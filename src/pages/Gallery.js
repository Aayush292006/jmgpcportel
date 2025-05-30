import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchGallery();
  }, [page]);

  useEffect(() => {
    if (events.length > 0) setFadeIn(true);
  }, [events]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://jmgpc-backend.onrender.com/api/gallery?page=${page}&limit=9`);
      if (res.data && res.data.galleryItems) {
        setEvents((prevEvents) => {
          const newEvents = res.data.galleryItems.filter(
            (event) => !prevEvents.some((prevEvent) => prevEvent._id === event._id)
          );
          return [...prevEvents, ...newEvents];
        });
      }
    } catch (error) {
      console.error('Error fetching gallery events:', error);
    }
    setLoading(false);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const styles = {
    container: {
      paddingTop: '60px',  // top padding added
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '40px',
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
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      width: '100%',
      maxWidth: '1000px',
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',

      // Responsive grid:
      // use a media query below to adjust for smaller screens
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
      height: '350px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'transform 0.4s ease',
      marginBottom: '10px',
    },
    cardTitle: {
      fontSize: '20px',
      margin: '10px 0',
      color: '#333',
      fontWeight: '500',
      flexShrink: 0,
    },
    description: {
      fontSize: '14px',
      marginBottom: '15px',
      color: '#666',
      flexGrow: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    link: {
      color: '#007BFF',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease',
      flexShrink: 0,
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
          /* Responsive grid columns */
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
            .container {
              padding-top: 30px !important;
              padding-left: 15px !important;
              padding-right: 15px !important;
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
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.1)';
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
                  onMouseEnter={(e) => (e.target.style.color = '#0056b3')}
                  onMouseLeave={(e) => (e.target.style.color = '#007BFF')}
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
