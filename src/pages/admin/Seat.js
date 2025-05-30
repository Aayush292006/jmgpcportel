import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Seat() {
  const [rollNumber, setRollNumber] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [seatInfo, setSeatInfo] = useState(null);
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const randomCode = Math.random().toString(36).substring(2, 8);
    setCaptcha(randomCode.toUpperCase());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captcha !== userCaptcha.toUpperCase()) {
      setError('Captcha incorrect');
      generateCaptcha();
      return;
    }

    try {
      const response = await axios.post('https://jmgpc-backend.onrender.com/api/find-seat', { rollNumber });
      if (response.data.seat) {
        setSeatInfo(response.data.seat);
        setError('');
      } else {
        setError('Seat not found');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow-lg rounded-lg bg-white mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Find Your Seat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Roll Number"
          className="w-full mb-2 p-2 border rounded"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <div className="flex items-center mb-2">
          <span className="px-3 py-2 bg-gray-200 font-mono rounded">{captcha}</span>
          <button type="button" onClick={generateCaptcha} className="ml-2 text-blue-600 text-sm">
            Refresh
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter Captcha"
          className="w-full mb-4 p-2 border rounded"
          value={userCaptcha}
          onChange={(e) => setUserCaptcha(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Find Seat
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {seatInfo && (
        <div className="mt-4 p-3 bg-green-100 rounded">
          <h3 className="font-bold">Seat Details:</h3>
          <p>Room: {seatInfo.room}</p>
          <p>Seat Number: {seatInfo.seatNumber}</p>
        </div>
      )}
    </div>
  );
}

export default Seat;