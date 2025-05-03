import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF library

const BlueprintGenerator = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [branches, setBranches] = useState([]);
  const [blueprint, setBlueprint] = useState([]);
  const [isBlueprintGenerated, setIsBlueprintGenerated] = useState(false);
  const [branchInput, setBranchInput] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [yearInput, setYearInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const availableBranches = ["CSE", "MECH", "ET & TC", "Civil", "FT", "MOM"];
  const availableYears = ["1st Year", "2nd Year", "3rd Year"];

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/rooms");
      setRooms(res.data.rooms);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    }
  };

  const handleRoomSelection = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    if (room) {
      setSelectedRoom(room);
      setBranches([]);
      setBlueprint([]);
      setIsBlueprintGenerated(false);
      setErrorMessage("");
      generateEmptyBlueprint(room);
    } else {
      setErrorMessage("Selected room not found.");
    }
  };

  const generateEmptyBlueprint = (room) => {
    let seats = [];
    for (let row = 0; row < room.rows; row++) {
      let rowSeats = [];
      for (let col = 0; col < room.columns; col++) {
        rowSeats.push({ booked: false, row, col, branch: "", student: "" });
      }
      seats.push(rowSeats);
    }
    setBlueprint(seats);
  };

  const handleAddBranch = () => {
    if (!branchInput || studentCount <= 0 || !yearInput) {
      alert("Please fill in all fields.");
      return;
    }

    const totalStudents = branches.reduce((sum, b) => sum + b.students, 0);
    const totalSeats = selectedRoom.rows * selectedRoom.columns;

    if (totalStudents + studentCount > totalSeats) {
      setErrorMessage("Not enough seats for all students.");
      return;
    }

    setBranches([
      ...branches,
      { branch: branchInput, students: studentCount, year: yearInput },
    ]);
    setBranchInput("");
    setStudentCount(0);
    setYearInput("");
    setErrorMessage(""); // Clear any error message
  };

  const handleGenerateBlueprint = () => {
    const totalStudents = branches.reduce((sum, b) => sum + b.students, 0);
    const totalSeats = selectedRoom.rows * selectedRoom.columns;

    if (totalStudents > totalSeats) {
      setErrorMessage("Not enough seats for all students.");
      return;
    }

    const allStudents = [];
    branches.forEach(({ branch, students }) => {
      for (let i = 0; i < students; i++) {
        allStudents.push({ branch, studentNumber: i + 1 });
      }
    });

    const grouped = branches.map((b) =>
      allStudents.filter((s) => s.branch === b.branch)
    );

    const interleaved = [];
    let i = 0;
    while (interleaved.length < allStudents.length) {
      for (let group of grouped) {
        if (group[i]) interleaved.push(group[i]);
      }
      i++;
    }

    const updated = blueprint.map((row) =>
      row.map((seat) => ({ ...seat, booked: false, student: "", branch: "" }))
    );
    interleaved.forEach((student, index) => {
      const row = Math.floor(index / selectedRoom.columns);
      const col = index % selectedRoom.columns;
      if (row < selectedRoom.rows) {
        updated[row][col].booked = true;
        updated[row][col].student = `${student.branch} ${student.studentNumber}`;
        updated[row][col].branch = student.branch;
      }
    });

    setBlueprint(updated);
    setIsBlueprintGenerated(true);
  };

  const handleDeleteBranch = (index) => {
    const newBranches = branches.filter((_, i) => i !== index);
    setBranches(newBranches);
  };

  const handleEditBranch = (index) => {
    const updatedBranch = prompt("Enter new branch name:", branches[index].branch);
    const updatedYear = prompt("Enter new year:", branches[index].year);
    const updatedStudents = prompt("Enter number of students:", branches[index].students);

    if (updatedBranch && updatedYear && updatedStudents) {
      const newBranches = [...branches];
      newBranches[index] = {
        ...newBranches[index],
        branch: updatedBranch,
        year: updatedYear,
        students: parseInt(updatedStudents),
      };
      setBranches(newBranches);
    }
  };

  const handleSeatEdit = (rowIndex, colIndex) => {
    if (isEditMode) {
      // Edit directly using inline input fields
      const updatedBlueprint = [...blueprint];
      const seat = updatedBlueprint[rowIndex][colIndex];

      const newStudent = window.prompt("Enter student name:", seat.student);
      const newBranch = window.prompt("Enter branch name:", seat.branch);

      updatedBlueprint[rowIndex][colIndex] = {
        ...seat,
        student: newStudent,
        branch: newBranch,
      };

      setBlueprint(updatedBlueprint);
    }
  };


  const handleDownloadBlueprint = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Exam Seating Blueprint", 20, 20);

    doc.setFontSize(8);

    blueprint.forEach((row, rowIndex) => {
      row.forEach((seat, colIndex) => {
        const x = 20 + colIndex * 40;
        const y = 40 + rowIndex * 20;

        const seatText = seat.booked
          ? `${seat.student} (${seat.branch})`
          : "Empty";

        doc.text(seatText, x, y);
      });
    });

    doc.save("blueprint.pdf");
  };

  const handleSaveBlueprint = async () => {
    try {
      await axios.post("http://localhost:3000/api/saveBlueprint", { blueprint });
      alert("Blueprint saved successfully!");
    } catch (err) {
      console.error("Error saving blueprint", err);
      alert("Failed to save blueprint");
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f7fc", minHeight: "100vh" }}>
      <h2 style={{ color: "#1D4ED8", fontSize: "28px", marginBottom: "20px" }}>📐 Exam Seating Blueprint Generator</h2>

      <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
        <select
          onChange={(e) => handleRoomSelection(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        >
          <option value="">-- Select a Room --</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              Room {room.number} - {room.floor} Floor
            </option>
          ))}
        </select>

        {selectedRoom && (
          <>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <select
                value={branchInput}
                onChange={(e) => setBranchInput(e.target.value)}
                style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
              >
                <option value="">-- Select Branch --</option>
                {availableBranches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                placeholder="Students"
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <select
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="">-- Select Year --</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddBranch}
                style={{
                  backgroundColor: "#2563EB",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
              >
                Add
              </button>
            </div>

            {branches.map((b, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#F1F5F9",
                  padding: "10px",
                  marginBottom: "5px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{b.branch}</strong> - {b.year} - {b.students} students
                </div>
                <div>
                  <button
                    onClick={() => handleEditBranch(i)}
                    style={{
                      backgroundColor: "#1D4ED8",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBranch(i)}
                    style={{
                      backgroundColor: "#DC2626",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {selectedRoom && (
        <div>
          <button
            onClick={handleGenerateBlueprint}
            style={{
              backgroundColor: "#10B981",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s ease",
              marginBottom: "20px",
            }}
          >
            Generate Blueprint
          </button>

          <button
            onClick={toggleEditMode}
            style={{
              backgroundColor: "#F59E0B",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s ease",
              marginBottom: "20px",
            }}
          >
            {isEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}
          </button>

        </div>
      )}

      {isBlueprintGenerated && (
        <div>
          <h3>Generated Blueprint</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${selectedRoom.columns}, 1fr)`,
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {blueprint.map((row, rowIndex) =>
              row.map((seat, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSeatEdit(rowIndex, colIndex)}
                  style={{
                    backgroundColor: seat.booked ? "#34D399" : "#F1F5F9",
                    color: seat.booked ? "black" : "#9CA3AF",
                    padding: "10px",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: isEditMode ? "pointer" : "default",
                    transition: "0.3s",
                  }}
                >
                  {seat.booked ? `${seat.student}` : "Empty"}
                </div>
              ))
            )}
          </div>

          <div>
            <button
              onClick={handleDownloadBlueprint}
              style={{
                backgroundColor: "#3B82F6",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Download Blueprint
            </button>
            <button
              onClick={handleSaveBlueprint}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Save Blueprint
            </button>
          </div>
        </div>
      )}

      {errorMessage && <div style={{ color: "red", marginTop: "20px" }}>{errorMessage}</div>}
    </div>
  );
};

export default BlueprintGenerator;
