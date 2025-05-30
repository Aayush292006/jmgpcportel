import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get('https://jmgpc-backend.onrender.com/api/students');
      setStudents(res.data.students);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { students, loading, fetchStudents };
};

export default useStudents;
