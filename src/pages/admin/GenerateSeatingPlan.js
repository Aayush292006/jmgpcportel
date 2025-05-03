import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar'; // Adjust path if necessary

const GenerateSeatingPlan = () => {
  const [rooms, setRooms] = useState([]); // State to hold rooms data
  const [seatingData, setSeatingData] = useState([]); // This will hold the generated seating data

  // Fetch room data from backend when component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const generateSeatingPlan = () => {
    // You can modify this logic to create actual seating arrangements
    const seatingPlan = rooms.map(room => ({
      roomName: room.number, // Updated to 'number' from 'name' assuming 'number' is used for room identification
      totalSeats: room.total_seats, // Adjusted to match the schema field name
      availableSeats: room.total_seats, // Initially, all seats are free
      studentsAssigned: 0, // Initially, no students are assigned
    }));
    setSeatingData(seatingPlan);
  };

  return (
    <div className="seating-plan">
      <AdminNavbar /> {/* Adding AdminNavbar here */}

      <div className="container mt-6 px-4">
        <h1 className="text-3xl font-bold text-center">Generate Seating Plan</h1>
        
        <button
          onClick={generateSeatingPlan}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Generate Seating Plan
        </button>
        
        <div className="seating-data mt-6">
          <h2 className="text-xl font-semibold">Available Rooms & Seats:</h2>
          <ul>
            {seatingData.length > 0 ? (
              seatingData.map((item, index) => (
                <li key={index}>
                  Room: {item.roomName} - Total Seats: {item.totalSeats} - Available: {item.availableSeats}
                </li>
              ))
            ) : (
              <p>No seating plan generated yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GenerateSeatingPlan;
