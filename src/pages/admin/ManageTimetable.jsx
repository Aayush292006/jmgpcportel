import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ManageTimetable = () => {
  const [form, setForm] = useState({
    branch: '',
    semester: '',
    subjects: [{ subjectName: '', subjectCode: '', date: '', time: '' }],
  });
  const [timetables, setTimetables] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // loader state

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://jmgpc-backend.onrender.com/api/timetables');
      setTimetables(res.data.timetables || []);
    } catch (err) {
      console.error('Error fetching timetables:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...form.subjects];
    updatedSubjects[index][name] = value;
    setForm({ ...form, subjects: updatedSubjects });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSubject = () => {
    setForm((prevForm) => ({
      ...prevForm,
      subjects: [...prevForm.subjects, { subjectName: '', subjectCode: '', date: '', time: '' }],
    }));
  };

  const removeSubject = (index) => {
    if (form.subjects.length > 1) {
      setForm((prevForm) => ({
        ...prevForm,
        subjects: prevForm.subjects.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://jmgpc-backend.onrender.com/api/timetables/${editingId}`, form);
      } else {
        await axios.post('https://jmgpc-backend.onrender.com/api/timetables', form);
      }
      setForm({
        branch: '',
        semester: '',
        subjects: [{ subjectName: '', subjectCode: '', date: '', time: '' }],
      });
      setEditingId(null);
      fetchTimetables();
    } catch (err) {
      console.error('Error saving timetable:', err);
    }
  };

  const editTimetable = (id) => {
    const timetable = timetables.find((tt) => tt._id === id);
    if (timetable) {
      setForm({
        branch: timetable.branch,
        semester: timetable.semester,
        subjects: timetable.subjects.length
          ? timetable.subjects
          : [{ subjectName: '', subjectCode: '', date: '', time: '' }],
      });
      setEditingId(id);
    }
  };

  const deleteTimetable = async (id) => {
    if (window.confirm('Are you sure you want to delete this timetable?')) {
      try {
        await axios.delete(`https://jmgpc-backend.onrender.com/api/timetables/${id}`);
        fetchTimetables();
      } catch (err) {
        console.error('Error deleting timetable:', err);
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-inter min-h-screen bg-gradient-to-br from-[#eef2f3] to-[#8e9eab]">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-6">
          🗓️ Manage Exam Timetable
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="branch"
              value={form.branch}
              onChange={handleFormChange}
              placeholder="Enter Branch"
              required
              className="input"
            />
            <input
              type="text"
              name="semester"
              value={form.semester}
              onChange={handleFormChange}
              placeholder="Enter Semester"
              required
              className="input"
            />
          </div>

          {form.subjects.map((subject, index) => (
            <div key={index} className="grid md:grid-cols-4 gap-4 items-end">
              <input
                type="text"
                name="subjectName"
                value={subject.subjectName}
                onChange={(e) => handleChange(e, index)}
                placeholder="Subject Name"
                required
                className="input"
              />
              <input
                type="text"
                name="subjectCode"
                value={subject.subjectCode}
                onChange={(e) => handleChange(e, index)}
                placeholder="Subject Code"
                required
                className="input"
              />
              <input
                type="date"
                name="date"
                value={subject.date}
                onChange={(e) => handleChange(e, index)}
                required
                className="input"
              />
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name="time"
                  value={subject.time}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  disabled={form.subjects.length === 1}
                  className="text-red-600 hover:text-red-800"
                  title="Remove Subject"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              type="button"
              onClick={addSubject}
              className="btn bg-green-500 hover:bg-green-600 text-white"
            >
              ➕ Add Subject
            </button>
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingId ? 'Update Timetable' : 'Save Timetable'}
            </button>
          </div>
        </form>
      </div>

      <h3 className="text-3xl font-semibold text-center mt-10 text-white drop-shadow">
        📚 All Uploaded Timetables.
      </h3>

      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6 mt-6">
          <AnimatePresence>
            {timetables.map((tt) => (
              <motion.div
                key={tt._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/70 backdrop-blur-lg shadow-md p-6 rounded-xl transition-all"
              >
                <h4 className="font-semibold text-xl text-gray-800">
                  {tt.branch} - Semester {tt.semester}
                </h4>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  {tt.subjects.map((sub, idx) => (
                    <li key={idx}>
                      <span className="font-medium text-gray-800">{sub.subjectName}</span> ({sub.subjectCode}) - {sub.date} at {sub.time}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => editTimetable(tt._id)}
                    className="btn bg-yellow-400 hover:bg-yellow-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteTimetable(tt._id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white"
                  >
                    🗑 Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ManageTimetable;
