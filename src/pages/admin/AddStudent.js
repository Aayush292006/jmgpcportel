import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddStudent = () => {
  const [form, setForm] = useState({
    name: '',
    enrollment: '',
    branch: '',
    semester: '',
    year: '',
  });
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const branches = [
    'Computer Science Engineering (CSE)',
    'Mechanical Engineering (MECH)',
    'ET & TC Engineering (ET & TC)',
    'Civil Engineering (CIVIL)',
  ];

  const calculateYear = (semester) => {
    const sem = parseInt(semester.split(' ')[1]);
    if (sem <= 2) return '1st Year';
    if (sem <= 4) return '2nd Year';
    if (sem <= 6) return '3rd Year';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'semester') {
      const year = calculateYear(value);
      setForm({ ...form, semester: value, year });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', form.name);
    formData.append('enrollment', form.enrollment);
    formData.append('branch', form.branch);
    formData.append('semester', form.semester);
    formData.append('year', form.year);

    try {
      const res = await axios.post('https://jmgpc-backend.onrender.com/api/students', formData);
      setMessage(res.data.message || '✅ Student added successfully!');
      setForm({
        name: '',
        enrollment: '',
        branch: '',
        semester: '',
        year: '',
      });
      setPhoto(null);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || 'Something went wrong.'}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-10 p-8 rounded-xl shadow-xl bg-white border border-gray-100"
    >
      <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">➕ Add New Student</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <motion.div whileFocus={{ scale: 1.02 }}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </motion.div>

        <motion.div whileFocus={{ scale: 1.02 }}>
          <input
            type="text"
            name="enrollment"
            value={form.enrollment}
            onChange={handleChange}
            placeholder="Enrollment Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </motion.div>

        <motion.div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            required
          />
        </motion.div>

        <motion.div>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch, i) => (
              <option key={i} value={branch}>{branch}</option>
            ))}
          </select>
        </motion.div>

        <motion.div>
          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={`Semester ${n}`}>Semester {n}</option>
            ))}
          </select>
        </motion.div>

        {form.year && (
          <motion.p
            className="text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🎓 <strong>Year:</strong> {form.year}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200"
        >
          ✅ Submit
        </motion.button>

        {message && (
          <motion.p
            className={`mt-3 text-center font-medium ${
              message.startsWith('✅') ? 'text-green-600' : 'text-red-500'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default AddStudent;
