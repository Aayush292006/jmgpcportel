import React, { useEffect, useState } from "react";
import SeatingCanvas from "./SeatingCanvas";
import axios from "axios";

const SeatingBlueprint = () => {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [seatingPlan, setSeatingPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch rooms and students
  useEffect(() => {
    const fetchData = async () => {
      const roomRes = await axios.get("/api/roomdata"); // Your room route
      const studentRes = await axios.get("/api/students"); // Filter as needed
      setRooms(roomRes.data);
      setStudents(studentRes.data);
    };
    fetchData();
  }, []);

  // Generate seating blueprint
  const generateSeating = () => {
    let studentIndex = 0;
    const plan = [];

    rooms.forEach((room) => {
      const { _id, roomNumber, rows, columns } = room;
      const totalSeats = rows * columns;
      const seats = [];

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          if (studentIndex < students.length) {
            row.push({
              student: students[studentIndex],
              seat: `${roomNumber}-${i + 1}-${j + 1}`,
              status: "booked",
            });
            studentIndex++;
          } else {
            row.push(null); // empty seat
          }
        }
        seats.push(row);
      }

      plan.push({
        roomId: _id,
        roomNumber,
        rows,
        columns,
        seats,
      });
    });

    setSeatingPlan(plan);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Generate Seating Blueprint</h2>
      <button
        onClick={generateSeating}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Generate Blueprint
      </button>

      {seatingPlan.map((room, index) => (
        <div key={index} className="mb-8 border p-4 rounded shadow">
          <h3 className="text-md font-bold mb-2">
            Room: {room.roomNumber} ({room.rows}x{room.columns})
          </h3>
          <SeatingCanvas room={room} />
        </div>
      ))}
    </div>
  );
};

export default SeatingBlueprint;
