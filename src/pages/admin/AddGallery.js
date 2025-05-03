import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddGallery = () => {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', link: '' });
  const [imageFile, setImageFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/gallery');
      setEvents(response.data.galleryItems);
      setFadeIn(true);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddOrUpdate = async () => {
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('description', newEvent.description);
    formData.append('link', newEvent.link || '');
    if (imageFile) formData.append('image', imageFile);

    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/gallery/${editingId}`, formData);
        alert('Event updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/gallery', formData);
        alert('Gallery event added successfully!');
      }
      setNewEvent({ title: '', description: '', link: '' });
      setImageFile(null);
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setNewEvent({ title: event.title, description: event.description, link: event.link });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        setLoading(true);

        // Delete the item from the backend
        await axios.delete(`http://localhost:3000/api/gallery/${id}`);

        // Update the UI (remove the deleted item from the local state)
        setGalleryItems((prevItems) => prevItems.filter(item => item._id !== id));

        alert('Gallery item deleted!');
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error deleting the gallery item');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{editingId ? 'Edit' : 'Add'} Gallery Event</h2>

      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleChange}
          placeholder="Title"
          style={styles.input}
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          style={styles.textarea}
        />
        <input
          type="text"
          name="link"
          value={newEvent.link}
          onChange={handleChange}
          placeholder="Link (optional)"
          style={styles.input}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <button
          type="button"
          onClick={handleAddOrUpdate}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Processing...' : editingId ? 'Update' : 'Add Event'}
        </button>
      </form>

      <hr style={styles.divider} />
      <h3 style={styles.header}>Gallery Events</h3>

      {loading ? (
        <div style={styles.spinnerContainer}>
          <div style={styles.spinner}></div>
        </div>
      ) : (
        <div
          style={{
            ...styles.cardGrid,
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {events.map((event) => (
            <div key={event._id} style={styles.card}>
              <img
                src={`http://localhost:3000${event.imageUrl}`}
                alt={event.title}
                style={styles.image}
              />
              <h4 style={styles.cardTitle}>{event.title}</h4>
              <p style={styles.description}>{event.description}</p>
              {event.link && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  View More
                </a>
              )}
              <div style={styles.buttonGroup}>
                <button onClick={() => handleEdit(event)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(event._id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f2f4f7',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 5px 12px rgba(0,0,0,0.08)',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '15px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    marginBottom: '15px',
    resize: 'vertical',
  },
  fileInput: {
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  divider: {
    margin: '40px 0',
    border: 'none',
    borderTop: '1px solid #ddd',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    margin: '10px 0',
    fontSize: '18px',
    color: '#34495e',
  },
  description: {
    color: '#555',
    fontSize: '14px',
    marginBottom: '10px',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  link: {
    color: '#2980b9',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  editBtn: {
    backgroundColor: '#f1c40f',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '150px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #ddd',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Spinner keyframes
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);

export default AddGallery;
