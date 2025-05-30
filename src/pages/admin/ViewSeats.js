import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewSeats = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios.get('https://jmgpc-backend.onrender.com/api/seating/all').then((res) => setSeats(res.data));
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>All Assigned Seats</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th style={cellStyle}>Enrollment</th>
            <th style={cellStyle}>Room</th>
            <th style={cellStyle}>Seat</th>
            <th style={cellStyle}>College</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((s, index) => (
            <tr key={index}>
              <td style={cellStyle}>{s.enrollment}</td>
              <td style={cellStyle}>{s.room}</td>
              <td style={cellStyle}>{s.seatNumber}</td>
              <td style={cellStyle}>{s.college}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = { border: '1px solid #ccc', padding: '8px', textAlign: 'left' };
export default ViewSeats;
