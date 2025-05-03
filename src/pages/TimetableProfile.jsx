import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TimetableProfile = () => {
  const { branch, semester } = useParams(); // Get branch and semester from URL
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, [branch, semester]);

  const fetchTimetable = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/timetables/${branch}/${semester}`);
      setTimetable(res.data.timetable || null);
    } catch (err) {
      console.error('Error fetching timetable:', err);
    }
  };

  if (!timetable) {
    return <div>Loading timetable...</div>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ textAlign: 'center' }}>
        {timetable.branch} - Semester {timetable.semester} Timetable
      </h2>
      <ul>
        {timetable.subjects.map((subject, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <strong>{subject.subjectName} ({subject.subjectCode})</strong>
            <p style={{ margin: '5px 0' }}>
              Date: {subject.date} | Time: {subject.time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimetableProfile;
