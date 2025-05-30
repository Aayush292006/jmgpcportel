import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // to store the selected student
  const [seating, setSeating] = useState([{
    subject: '',
    paperCode: '',
    subjectCode: '',
    date: '',
    time: '',
    seatNumber: '',
    roomNumber: '',
  }]);
  const [savedSeatings, setSavedSeatings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchSeatings();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://jmgpc-backend.onrender.com/api/students');
      setStudents(res.data.students || []);
    } catch (err) {
      console.error(err);
      setError('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  const fetchSeatings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://jmgpc-backend.onrender.com/api/seatings');
      setSavedSeatings(res.data.seatings || []);
    } catch (err) {
      console.error(err);
      setError('Error fetching seatings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...seating];
    updated[index][name] = value;
    setSeating(updated);
  };

  const handleAddExam = () => {
    setSeating([
      ...seating,
      {
        subject: '',
        paperCode: '',
        subjectCode: '',
        date: '',
        time: '',
        seatNumber: '',
        roomNumber: '',
      },
    ]);
  };

  const handleRemoveExam = (index) => {
    setSeating(seating.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Ensure a student is selected before submitting
      if (!selectedStudent) {
        throw new Error('Please select a student');
      }

      for (let i = 0; i < seating.length; i++) {
        const exam = seating[i];
        if (
          !exam.subject.trim() ||
          !exam.paperCode.trim() ||
          !exam.subjectCode.trim() ||
          !exam.date.trim() ||
          !exam.time.trim() ||
          !exam.seatNumber.trim() ||
          !exam.roomNumber.trim()
        ) {
          throw new Error(`Please fill in all fields for exam ${i + 1}`);
        }
      }

      const examsWithEnrollment = seating.map((exam) => ({ ...exam, enrollment: selectedStudent.enrollment }));

      let response;
      if (editId) {
        // PUT request to update existing seating
        response = await axios.put(`https://jmgpc-backend.onrender.com/api/seatings/${editId}`, {
          enrollment: selectedStudent.enrollment,
          exams: examsWithEnrollment,
        });
      } else {
        // POST request to create new seating
        response = await axios.post('https://jmgpc-backend.onrender.com/api/seatings', {
          enrollment: selectedStudent.enrollment,
          exams: examsWithEnrollment,
        });
      }

      if (response.status === 200) {
        const result = response.data;
        setSuccess(editId ? 'Seating updated successfully' : 'Seating saved successfully');
        setSeating([{
          subject: '',
          paperCode: '',
          subjectCode: '',
          date: '',
          time: '',
          seatNumber: '',
          roomNumber: '',
        }]);
        setSelectedStudent(null); // Reset selected student
        setEditId(null);
        fetchSeatings(); // Refresh the seating list
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to save seating');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setSelectedStudent(students.find(student => student.enrollment === data.enrollment));
    setSeating(data.exams || []);
    setEditId(data._id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://jmgpc-backend.onrender.com/api/seatings/${id}`);
      setSavedSeatings((prev) => prev.filter((s) => s._id !== id));
      setSuccess('Seating deleted successfully');
    } catch (err) {
      console.error(err);
      setError('Error deleting seating');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.enrollment?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(today.getDate()).padStart(2, '0'); // Day of the month
    return `${year}-${month}-${day}`;  // Return in the format 'YYYY-MM-DD'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Exam Seating</h2>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <div style={{ color: 'red', background: '#fdd', padding: '10px', borderRadius: '5px' }}>{error}</div>}
      {success && <div style={{ color: 'green', background: '#dff0d8', padding: '10px', borderRadius: '5px' }}>{success}</div>}

      

      <select
        onChange={(e) => setSelectedStudent(students.find(student => student.enrollment === e.target.value))}
        value={selectedStudent ? selectedStudent.enrollment : ''}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ddd' }}
      >
        <option value="">Select Student</option>
        {filteredStudents.map(student => (
          <option key={student.enrollment} value={student.enrollment}>
            {student.name} ({student.enrollment})
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit} style={{ margin: '0 auto', maxWidth: '800px' }}>
        {seating.map((exam, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
            {/* Subject input */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={exam.subject}
              onChange={(e) => handleChange(e, index)}
              required
              style={{ margin: '5px', padding: '10px', width: 'calc(33% - 10px)', borderRadius: '4px', border: '1px solid #ddd' }}
            />

            {/* Paper Code input */}
            <input
              type="text"
              name="paperCode"
              placeholder="Paper Code"
              value={exam.paperCode}
              onChange={(e) => handleChange(e, index)}
              required
              style={{ margin: '5px', padding: '10px', width: 'calc(33% - 10px)', borderRadius: '4px', border: '1px solid #ddd' }}
            />

            {/* Subject Code input */}
            <input
              type="text"
              name="subjectCode"
              placeholder="Subject Code"
              value={exam.subjectCode}
              onChange={(e) => handleChange(e, index)}
              required
              style={{ margin: '5px', padding: '10px', width: 'calc(33% - 10px)', borderRadius: '4px', border: '1px solid #ddd' }}
            />

            {/* Date input */}
            <input
              type="date"
              name="date"
              value={exam.date}
              onChange={(e) => handleChange(e, index)}
              min={getTodayDate()}
              required
              style={{ margin: '5px', padding: '10px', width: 'calc(33% - 10px)', borderRadius: '4px', border: '1px solid #ddd' }}
            />

            {/* Time input */}
            <input
              type="time"
              name="time"
              value={exam.time}
              onChange={(e) => handleChange(e, index)}
              required
              style={{ margin: '5px', padding: '10px', width: 'calc(33% - 10px)', borderRadius: '4px', border: '1px solid #ddd' }}
            />

            {/* Seat Number input */}
            <input
              type="text"
              name="seatNumber"
              placeholder="Seat Number"
              value={exam.seatNumber}
              onChange={(e) => handleChange(e, index)}
              required
              style={{ margin: '5px', padding: '10px', width: 'calc(33% - 10px)', borderRadius: '4px', border: '1px solid #ddd' }}
            />

            {/* Room Number input */}
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={exam.roomNumber}
              onChange={(e) => handleChange(e, index)}
              required
              style={{ margin: '5px', padding: '10px', width: 'calc(33% - 10px)', borderRadius: '4px', border: '1px solid #ddd' }}
            />

            <button type="button" onClick={() => handleRemoveExam(index)} style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', borderRadius: '4px', border: 'none' }}>Remove</button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddExam}
          style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px', border: 'none', marginBottom: '20px' }}
        >
          Add Exam
        </button>

        <button
          type="submit"
          style={{ padding: '8px 16px', backgroundColor: '#008CBA', color: 'white', borderRadius: '4px', border: 'none' }}
        >
          Submit Seating
        </button>
      </form>

      <h3 style={{ marginTop: '40px', textAlign: 'center' }}>Saved Seatings</h3>
      {savedSeatings.length === 0 ? (
        <p>No seatings available</p>
      ) : (
        savedSeatings.map((data) => (
          <div
            key={data._id}
            style={{ background: '#f1f1f1', padding: '15px', marginBottom: '20px', borderRadius: '6px' }}
          >
            <p><strong>Enrollment:</strong> {data.enrollment}</p>
            <div style={{ marginBottom: '10px' }}>
              {data.exams.map((exam, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px',
                    background: '#ffffff',
                    marginBottom: '10px',
                    borderRadius: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <p><strong>Subject:</strong> {exam.subject}</p>
                  <p><strong>Paper Code:</strong> {exam.paperCode}</p>
                  <p><strong>Subject Code:</strong> {exam.subjectCode}</p>
                  {/* Format the date before displaying */}
                  <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString('en-GB')}</p> {/* Format here */}
                  <p><strong>Time:</strong> {exam.time}</p>
                  <p><strong>Seat No:</strong> {exam.seatNumber}</p>
                  <p><strong>Room No:</strong> {exam.roomNumber}</p>
                </div>
              ))}

            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEdit(data)}
                style={{
                  background: '#ffc107',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#000',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(data._id)}
                style={{
                  background: '#dc3545',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanel;
