// src/api.js
import axios from 'axios';

const API_URL = 'https://jmgpc-backend.onrender.com/api'; // Change port to 3000

// ✅ Admin: Add exam seating
export const addExamSeating = async (examData) => {
  try {
    const response = await axios.post(`${API_URL}/exams/add`, examData); // Use the correct route
    return response.data;
  } catch (error) {
    console.error('Error adding exam seating:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Student: Get seating arrangement by enrollment number
export const getStudentSeating = async (enrollment) => {
  try {
    const response = await axios.get(`${API_URL}/exams/${enrollment}`); // Correct API call for student seating
    return response.data;
  } catch (error) {
    console.error('Error fetching student seating:', error.response?.data || error.message);
    throw error;
  }
};

const instance = axios.create({
  baseURL: 'https://jmgpc-backend.onrender.com/api',  // Ensure baseURL is consistent
  withCredentials: true,
});

export default instance;
 
