import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';

const StudentPanel = () => {
  const [enrollment, setEnrollment] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());
  const [seatingData, setSeatingData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to generate a random CAPTCHA
  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSeatingData([]);
    setLoading(true);

    // Check if CAPTCHA is correct
    if (userCaptcha !== generatedCaptcha) {
      setLoading(false);
      setError('Captcha is incorrect. Please try again.');
      setGeneratedCaptcha(generateCaptcha()); // Refresh CAPTCHA
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/api/seating/${enrollment}`);
      const data = res.data.data; // Accessing the nested 'data' property in response
      console.log('API Response Data:', data); // Log the response to debug

      // Get the exams array from the response data
      const exams = data.exams;

      // Handle if no exams data is returned
      if (!exams || exams.length === 0) {
        setError('❌ No seating information found for this enrollment number.');
        setLoading(false);
        return;
      }

      // Filter the seating data based on the exam date
      const now = moment();
      const validSeating = exams
        .filter((item) => {
          const examDateTime = moment(`${item.date} ${item.time}`, 'YYYY-MM-DD HH:mm');
          const diffMinutes = examDateTime.diff(now, 'minutes');

          if (diffMinutes < -180) {
            return { ...item, status: 'expired', message: 'Your exam has happened. Seating expired. Thank you!' };
          }

          if (diffMinutes >= 0 && diffMinutes <= 30) {
            return { ...item, status: 'available', message: 'Seating info available within 30 minutes!' };
          }

          if (diffMinutes >= 0 && diffMinutes <= 180) {
            return { ...item, status: 'soon', message: 'Your exam is starting soon!' };
          }

          return null;
        })
        .filter(Boolean);

      if (validSeating.length === 0) {
        setError('🕒 Seating info will be available 30 minutes before your exam.');
      } else {
        setSeatingData(validSeating);
      }
    } catch (err) {
      console.error('Error fetching data:', err); // Log error details
      setError('❌ Something went wrong. Please check your enrollment number.');
    } finally {
      setLoading(false);
    }
  };

  // Function to download seating data as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Seating Details', 20, 20);
    doc.setFontSize(12);

    // Add the Enrollment Number at the top of the PDF
    doc.text(`Enrollment Number: ${enrollment}`, 20, 30);

    seatingData.forEach((seating, index) => {
      const yPosition = 40 + index * 60;
      doc.text(`Subject: ${seating.subject}`, 20, yPosition);
      doc.text(`Paper Code: ${seating.paperCode}`, 20, yPosition + 10);
      doc.text(`Subject Code: ${seating.subjectCode}`, 20, yPosition + 20);
      doc.text(`Seat: ${seating.seatNumber}`, 20, yPosition + 30);
      doc.text(`Room: ${seating.roomNumber}`, 20, yPosition + 40);
      doc.text(`Date: ${moment(seating.date).format('DD MMM YYYY')}`, 20, yPosition + 50);
      doc.text(`Time: ${seating.time}`, 20, yPosition + 60);

      if (seating.status === 'expired') {
        doc.text(seating.message, 20, yPosition + 70);
      } else if (seating.status === 'soon') {
        doc.text(seating.message, 20, yPosition + 70);
      } else if (seating.status === 'available') {
        doc.text(seating.message, 20, yPosition + 70);
      }
    });

    // Save the PDF
    doc.save('seating-details.pdf');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-8 transition-all duration-500">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">🎓 View Exam Seating</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Enrollment Number"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center gap-4">
            <div className="text-xl font-bold bg-gray-200 px-4 py-2 rounded-lg tracking-widest">
              {generatedCaptcha}
            </div>
            <button
              type="button"
              onClick={() => setGeneratedCaptcha(generateCaptcha())}
              className="text-sm text-blue-500 hover:underline"
            >
              🔄 Refresh
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter Captcha"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 font-semibold"
          >
            🔍 Get Seating
          </button>
        </form>

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg transition-opacity duration-300">
            ⚠️ {error}
          </div>
        )}

        {seatingData.length === 0 && !loading && !error && (
          <div className="mt-6 p-4 text-gray-700">No seating information found. Please check your enrollment number.</div>
        )}

        {seatingData.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl animate-fade-in">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">🪑 Your Seating Info</h3>
            <ul className="space-y-4">
              {seatingData.map((seating, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <p><strong>📘 Subject:</strong> {seating.subject}</p>
                  <p><strong>📄 Paper Code:</strong> {seating.paperCode}</p>
                  <p><strong>🔢 Subject Code:</strong> {seating.subjectCode}</p>
                  <p><strong>🪑 Seat:</strong> {seating.seatNumber}</p>
                  <p><strong>🏫 Room:</strong> {seating.roomNumber}</p>
                  <p><strong>📅 Date:</strong> {moment(seating.date).format('DD MMM YYYY')}</p> {/* Formatting date here */}
                  <p><strong>⏰ Time:</strong> {seating.time}</p>
                  {seating.status === 'expired' && <p className="text-red-600">{seating.message}</p>}
                  {seating.status === 'soon' && <p className="text-yellow-600">{seating.message}</p>}
                  {seating.status === 'available' && <p className="text-green-600">{seating.message}</p>}
                </li>
              ))}
            </ul>
            {/* Button to download PDF */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={downloadPDF}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                📥 Download Seating Details (PDF)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentPanel;
