import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/exams').then((res) => setExams(res.data));
  }, []);

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>All Exams</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th style={cellStyle}>Subject</th>
            <th style={cellStyle}>Code</th>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Time</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index}>
              <td style={cellStyle}>{exam.subjectName}</td>
              <td style={cellStyle}>{exam.subjectCode}</td>
              <td style={cellStyle}>{exam.date}</td>
              <td style={cellStyle}>{exam.startTime} - {exam.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = { border: '1px solid #ccc', padding: '8px', textAlign: 'left' };
export default ViewExams;
