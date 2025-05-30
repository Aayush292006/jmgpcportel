import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditStudentModal = ({ student, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('https://jmgpc-backend.onrender.com/api/students', formData);
      if (res.data.success) {
        onSave(formData);
        onClose();
      } else {
        alert('Failed to update student.');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '300px'
      }}>
        <h3>Edit Student</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="text"
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
            placeholder="Enrollment Number"
            disabled
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="ETTC">ETTC</option>
            <option value="CIVIL">CIVIL</option>
          </select>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option>
          </select>
          <button type="submit" style={{
            width: '48%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '4%'
          }}>Save Changes</button>
          <button type="button" onClick={onClose} style={{
            width: '48%',
            padding: '10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
