import React, { useState } from 'react';
import axios from 'axios';

function StudentForm({ student }) {
  const [formData, setFormData] = useState({
    name: student ? student.name : '',
    enrollment: student ? student.enrollment : '',
    branch: student ? student.branch : '',
    semester: student ? student.semester : '',
    year: student ? student.year : '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = student
        ? await axios.put(`/api/students/${student.enrollment}`, formDataToSend)
        : await axios.post('/api/students', formDataToSend);

      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="enrollment" value={formData.enrollment} onChange={handleChange} placeholder="Enrollment" required />
      <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" required />
      <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder="Semester" required />
      <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
      <input type="file" name="photo" onChange={handleFileChange} />
      <button type="submit">{student ? 'Update' : 'Add'} Student</button>
    </form>
  );
}

export default StudentForm;
