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
    setFadeIn(true);
  }, [events]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/gallery?page=${page}&limit=9`);
      if (res.data && res.data.galleryItems) {
        setEvents((prevEvents) => [
          ...prevEvents,
          ...res.data.galleryItems.filter((event) => !event.deleted),
        ]);
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
      padding: '40px',
      backgroundColor: '#f4f7fc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      position: 'relative',
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
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'transform 0.4s ease',
    },
    cardTitle: {
      fontSize: '20px',
      margin: '10px 0',
      color: '#333',
      fontWeight: '500',
    },
    description: {
      fontSize: '14px',
      marginBottom: '15px',
      color: '#666',
    },
    link: {
      color: '#007BFF',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease',
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
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
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
        <div style={styles.cardGrid}>
          {events.map((event) => (
            <div
              key={event._id}
              style={styles.card}
              className="card-hover"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.cardHover.transform;
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = styles.cardImageHover.transform;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'none';
              }}
            >
              <img
                src={`http://localhost:3000${event.imageUrl}`}
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
