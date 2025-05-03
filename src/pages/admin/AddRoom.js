import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRoom = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  const API_BASE = 'http://localhost:3000/api/rooms';

  const fetchRooms = () => {
    axios.get(API_BASE)
      .then(response => {
        if (response.data.success && Array.isArray(response.data.rooms)) {
          setRooms(response.data.rooms);
        } else {
          setRooms([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching rooms:', err);
        setRooms([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomNumber || !floor || !rows || !columns) {
      setError('All fields are required');
      return;
    }

    try {
      const roomData = { roomNumber, floor, rows, columns };
      let response;

      if (editMode) {
        response = await axios.put(`${API_BASE}/${currentRoom._id}`, roomData);
      } else {
        response = await axios.post(API_BASE, roomData);
      }

      if (response.data.success) {
        if (editMode) {
          setRooms(prevRooms =>
            prevRooms.map(room =>
              room._id === currentRoom._id ? response.data.room : room
            )
          );
        } else {
          setRooms(prevRooms => [...prevRooms, response.data.room]);
        }
        resetForm();
      } else {
        setError(response.data.message || 'Failed to add or update room');
      }
    } catch (err) {
      console.error('Error adding or updating room:', err);
      setError('Failed to add or update room');
    }
  };

  const resetForm = () => {
    setRoomNumber('');
    setFloor('');
    setRows('');
    setColumns('');
    setError('');
    setEditMode(null);
    setCurrentRoom(null);
  };

  const handleEdit = (room) => {
    setRoomNumber(room.roomNumber);
    setFloor(room.floor);
    setRows(room.rows);
    setColumns(room.columns);
    setCurrentRoom(room);
    setEditMode(true);
  };

  const handleDelete = async (roomId) => {
    if (!roomId) {
      setError('Room ID is missing');
      return;
    }

    try {
      const updatedRooms = rooms.filter(room => room._id !== roomId);
      setRooms(updatedRooms);

      const response = await axios.delete(`${API_BASE}/${roomId}`);

      if (!response.data.success) {
        setRooms(rooms);
        setError(response.data.message || 'Failed to delete room');
      }
    } catch (err) {
      console.error('Error deleting room:', err);
      if (err.response && err.response.status === 404) {
        setError('Room not found. It may have already been deleted.');
      } else {
        setError('Failed to delete room. Please try again.');
      }
      fetchRooms();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add or Edit Room</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <input type="text" placeholder="Room Number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Floor" value={floor} onChange={(e) => setFloor(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Rows" value={rows} onChange={(e) => setRows(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Columns" value={columns} onChange={(e) => setColumns(e.target.value)} style={inputStyle} />
        <button type="submit" style={buttonStyle}>
          {editMode ? 'Update Room' : 'Add Room'}
        </button>
      </form>

      <h3 style={{ textAlign: 'center' }}>Rooms List</h3>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
          <div className="loader"></div>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Room Number</th>
              <th style={thStyle}>Floor</th>
              <th style={thStyle}>Rows</th>
              <th style={thStyle}>Columns</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id}>
                <td style={tdStyle}>{room.roomNumber}</td>
                <td style={tdStyle}>{room.floor}</td>
                <td style={tdStyle}>{room.rows}</td>
                <td style={tdStyle}>{room.columns}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEdit(room)} style={editBtnStyle}>Edit</button>
                  <button onClick={() => handleDelete(room._id)} style={deleteBtnStyle}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Loader CSS */}
      <style>
        {`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Reusable styles
const inputStyle = {
  padding: '10px',
  width: '300px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const thStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ddd',
  backgroundColor: '#f2f2f2',
};

const tdStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

const editBtnStyle = {
  backgroundColor: '#ff9800',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
  marginRight: '10px',
};

const deleteBtnStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
};

export default AddRoom;
