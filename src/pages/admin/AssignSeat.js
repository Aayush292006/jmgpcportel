import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignSeat = () => {
  const [exams, setExams] = useState([]);
  const [data, setData] = useState({
    examId: '', room: '', seatNumber: '', enrollment: '', college: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/exams').then((res) => setExams(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/seating', data);
    alert('✅ Seat Assigned');
    setData({});
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Assign Seat</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <select required onChange={(e) => setData({ ...data, examId: e.target.value })} style={{ padding: '8px', width: '300px' }}>
            <option>Select Exam</option>
            {exams.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.subjectName} - {exam.date}
              </option>
            ))}
          </select>
        </div>
        {['room', 'seatNumber', 'enrollment', 'college'].map((field, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              onChange={(e) => setData({ ...data, [field]: e.target.value })}
              style={{ padding: '8px', width: '300px' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'green', color: '#fff', border: 'none' }}>
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignSeat;
