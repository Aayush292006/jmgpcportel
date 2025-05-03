import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const StudentSeating = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloaded, setDownloaded] = useState(null);

  useEffect(() => {
    fetchStudentTimetable();
  }, []);

  const fetchStudentTimetable = async () => {
    try {
      const branch = 'Computer Science';
      const semester = '6';

      const res = await axios.get(`http://localhost:3000/api/timetables?branch=${branch}&semester=${semester}`);
      if (Array.isArray(res.data.timetables)) {
        setTimetable(res.data.timetables);
      } else {
        console.error('Invalid data format:', res.data);
        setTimetable([]);
      }
    } catch (err) {
      setError('Error fetching timetable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const downloadTimetablePDF = (index) => {
    const timetableElement = document.getElementById(`timetable-${index}`);
    const downloadButton = timetableElement.querySelector('.download-btn');
    if (downloadButton) downloadButton.style.display = 'none';

    // Create a jsPDF instance
    const doc = new jsPDF();

    // Convert the HTML content into PDF
    doc.html(timetableElement, {
      callback: (doc) => {
        // Scale the content and adjust the page size to make it smaller
        doc.save(`timetable-${index}.pdf`);
        setDownloaded(index);
      },
      margin: [10, 10, 10, 10], // Add some margins
      x: 10,
      y: 10,
      html2canvas: {
        scale: 0.5, // Reduce the scale to make the content smaller (default is 1)
      },
    });

    if (downloadButton) downloadButton.style.display = 'block';
  };

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#f0f2f5',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        fontWeight: '700',
        color: '#222',
        marginBottom: '30px'
      }}>
        📅 Exam Timetable
      </h1>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div className="loader"></div>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>Loading your timetable...</p>
        </div>
      ) : error ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#e53935' }}>{error}</p>
      ) : timetable.length > 0 ? (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {timetable.map((entry, index) => (
            <div
              key={index}
              id={`timetable-${index}`}
              style={{
                backgroundColor: '#fff',
                padding: '25px',
                marginBottom: '30px',
                borderRadius: '18px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                borderLeft: '6px solid #0077ff',
                transition: 'transform 0.2s ease-in-out'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h2 style={{
                fontSize: '22px',
                color: '#1e1e1e',
                fontWeight: '600',
                marginBottom: '20px'
              }}>
                {entry.branch} - Semester {entry.semester}
              </h2>

              <ul style={{ paddingLeft: '20px' }}>
                {entry.subjects.map((subject, idx) => (
                  <li key={idx} style={{
                    marginBottom: '12px',
                    fontSize: '17px',
                    color: '#444',
                    lineHeight: '1.6'
                  }}>
                    <strong style={{ color: '#0077ff' }}>
                      {subject.subjectName} ({subject.subjectCode})
                    </strong> – {subject.date} at {subject.time}
                  </li>
                ))}
              </ul>

              <div style={{ textAlign: 'center', marginTop: '25px' }}>
                <button
                  className="download-btn"
                  onClick={() => downloadTimetablePDF(index)}
                  style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#0077ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={e => e.target.style.backgroundColor = '#005fcc'}
                  onMouseLeave={e => e.target.style.backgroundColor = '#0077ff'}
                >
                  {downloaded === index ? '✅ Downloaded' : '⬇️ Download Timetable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No timetable found.</p>
      )}

      {/* Loader CSS */}
      <style>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #0077ff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StudentSeating;
