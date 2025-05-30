import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TimetableCardList = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimetables();
  }, []);

  // Function to fetch timetables from the backend
  const fetchTimetables = async () => {
    try {
      // Sending GET request to the backend
      const res = await axios.get('https://jmgpc-backend.onrender.com/api/timetables');
      console.log('Fetched timetables:', res.data);  // Log the response for debugging
      setTimetables(res.data.timetables || []);  // Set the timetables in state
      setLoading(false);  // Set loading to false once data is fetched
    } catch (err) {
      console.error('Error fetching timetables:', err);
      setError('Failed to fetch timetables');  // Display error message if there's an issue
      setLoading(false);  // Set loading to false in case of error
    }
  };

  // Function to navigate to the detailed timetable page
  const handleViewTimetable = (branch, semester) => {
    navigate(`/student/timetable/${branch}/${semester}`);
  };

  // Show loading indicator if still fetching data
  if (loading) return <div>Loading...</div>;

  // Show error message if there was an issue fetching the data
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ textAlign: 'center' }}>📚 View Your Timetable</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        {timetables.length === 0 ? (
          <p>No timetables available.</p>
        ) : (
          timetables.map((item, index) => (
            <div
              key={index}
              style={{
                width: '300px',
                padding: '20px',
                background: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <h3>{item.branch}</h3>
              <p>Semester: {item.semester}</p>
              <button
                onClick={() => handleViewTimetable(item.branch, item.semester)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                View Timetable
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TimetableCardList;
