import React, { useEffect, useState } from "react";

const SeatingPlan = () => {
  // Define states
  const [rooms, setRooms] = useState([]);
  const [availableBranches, setAvailableBranches] = useState([]);
  const [availableSemesters, setAvailableSemesters] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  // Sample useEffect to populate data (can be replaced with API calls)
  useEffect(() => {
    // Mock data for demonstration
    setRooms([
      { id: 1, roomNumber: "A101", floor: 1 },
      { id: 2, roomNumber: "B202", floor: 2 },
    ]);
    setAvailableBranches(["CSE", "ECE", "ME", "CE"]);
    setAvailableSemesters(["1", "2", "3", "4", "5", "6"]);
    setAvailableYears(["2023", "2024", "2025"]);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Seating Plan Setup</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select Branch */}
        <div>
          <label className="block font-medium mb-1">Select Branch</label>
          <select className="w-full border rounded px-3 py-2">
            <option value="">-- Select Branch --</option>
            {availableBranches.map((branch, idx) => (
              <option key={idx} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Select Semester */}
        <div>
          <label className="block font-medium mb-1">Select Semester</label>
          <select className="w-full border rounded px-3 py-2">
            <option value="">-- Select Semester --</option>
            {availableSemesters.map((sem, idx) => (
              <option key={idx} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Select Year */}
        <div>
          <label className="block font-medium mb-1">Select Year</label>
          <select className="w-full border rounded px-3 py-2">
            <option value="">-- Select Year --</option>
            {availableYears.map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Select Room */}
        <div>
          <label className="block font-medium mb-1">Select Room</label>
          <select className="w-full border rounded px-3 py-2">
            <option value="">-- Select Room --</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.roomNumber}>
                {room.roomNumber} (Floor {room.floor})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Generate Seating Blueprint
        </button>
      </div>
    </div>
  );
};

export default SeatingPlan;
