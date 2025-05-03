import React, { useState } from 'react';
import { addExamSeating } from '../../api'; // ✅ Correct import path

const AdminPanel = () => {
  const [examId, setExamId] = useState('');
  const [examDate, setExamDate] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [seatingArrangement, setSeatingArrangement] = useState([]);
  const [studentEnrollment, setStudentEnrollment] = useState('');
  const [seatNumber, setSeatNumber] = useState('');

  const handleAddSeating = () => {
    setSeatingArrangement([
      ...seatingArrangement,
      { studentEnrollment, seatNumber },
    ]);
    setStudentEnrollment('');
    setSeatNumber('');
  };

  const handleSubmit = async () => {
    const examData = {
      examId,
      examDate,
      roomNumber,
      seatingArrangement,
    };

    try {
      const result = await addExamSeating(examData);
      alert(result.message);
      setExamId('');
      setExamDate('');
      setRoomNumber('');
      setSeatingArrangement([]);
    } catch (error) {
      alert('Error adding exam seating');
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    marginTop: '10px',
    marginBottom: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const listItemStyle = {
    marginBottom: '5px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Admin Panel: Add Exam Seating</h2>

      <div>
        <label style={labelStyle}>Exam ID:</label>
        <input
          style={inputStyle}
          type="text"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Exam Date:</label>
        <input
          style={inputStyle}
          type="datetime-local"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Room Number:</label>
        <input
          style={inputStyle}
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <h3>Add Seating Arrangement:</h3>
        <label style={labelStyle}>Student Enrollment:</label>
        <input
          style={inputStyle}
          type="text"
          value={studentEnrollment}
          onChange={(e) => setStudentEnrollment(e.target.value)}
          required
        />

        <label style={labelStyle}>Seat Number:</label>
        <input
          style={inputStyle}
          type="text"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          required
        />

        <button style={buttonStyle} onClick={handleAddSeating}>Add Seating</button>
      </div>

      <div>
        <h4>Seating Arrangement:</h4>
        <ul>
          {seatingArrangement.map((item, index) => (
            <li key={index} style={listItemStyle}>
              {item.studentEnrollment} - {item.seatNumber}
            </li>
          ))}
        </ul>
      </div>

      <button style={buttonStyle} onClick={handleSubmit}>Submit Seating Arrangement</button>
    </div>
  );
};

export default AdminPanel;
