import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    enrollment: '',
    branch: '',
    semester: '',
    photo: null,
  });

  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/students');
      setStudents(res.data.students);
      setFilteredStudents(res.data.students);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = students.filter((student) =>
      Object.values(student).join(' ').toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const handleEditClick = (student) => {
    console.log('Editing student:', student); // Debugging
    setEditingStudent(student.enrollment);
    setEditFormData({
      name: student.name,
      enrollment: student.enrollment,
      branch: student.branch,
      semester: student.semester,
      photo: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setEditFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  

  const handleSaveEdit = async () => {
    const formData = new FormData();
    Object.entries(editFormData).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });
  
    try {
      const res = await axios.put(`http://localhost:3000/api/students/${editingStudent}`, formData);
      if (res.data.message) {
        alert('Student updated successfully!');
        setEditingStudent(null);
        fetchStudents();
      } else {
        alert('Failed to update student!');
      }
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };
  

  const handleDelete = async (enrollment) => {
    if (!window.confirm('Are you sure to delete this student?')) return;
  
    try {
      const res = await axios.delete(`http://localhost:3000/api/students/${enrollment}`);
      if (res.data.success) {
        alert('Student deleted!');
        setStudents((prev) => prev.filter((student) => student.enrollment !== enrollment));
        setFilteredStudents((prev) => prev.filter((student) => student.enrollment !== enrollment));
      } else {
        console.error('Delete failed:', res.data);
        alert('Failed to delete student!');
      }
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">📋 Registered Students</h1>

      <div className="mb-4 max-w-md mx-auto">
        <input
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-blue-400 rounded-lg focus:outline-none"
          placeholder="Search by name, enrollment, branch..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="p-3 border">Photo</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Enrollment</th>
              <th className="p-3 border">Branch</th>
              <th className="p-3 border">Semester</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) =>
              editingStudent === student.enrollment ? (
                <tr key={student.enrollment} className="text-sm text-gray-800">
                  <td className="p-2 border">
                    <input type="file" onChange={handleImageChange} />
                    {editFormData.photo && (
                      <img
                        src={URL.createObjectURL(editFormData.photo)}
                        alt="Preview"
                        className="w-10 h-10 rounded-full mt-2"
                      />
                    )}
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      name="enrollment"
                      value={editFormData.enrollment}
                      onChange={handleEditChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      name="branch"
                      value={editFormData.branch}
                      onChange={handleEditChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      name="semester"
                      value={editFormData.semester}
                      onChange={handleEditChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      ❌ Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={student.enrollment} className="text-sm hover:bg-gray-50">
                  <td className="p-2 border">
                    <img
                      src={
                        student.photo
                          ? `http://localhost:3000/uploads/${student.photo}`
                          : '/default-photo.jpg'
                      }
                      className="w-10 h-10 rounded-full object-cover"
                      alt="student"
                    />

                  </td>
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.enrollment}</td>
                  <td className="p-2 border">{student.branch}</td>
                  <td className="p-2 border">{student.semester}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(student)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.enrollment)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;
