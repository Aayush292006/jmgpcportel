const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();
const Seat = require('./models/Seat');
const seatRoutes = require('./routes/seatRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const PORT = 3000;
const Seating = require('./models/Seating');  // Adjust the path as per your folder structure



const app = express();

app.use(express.json());
// Import the model from the correct path
app.use(cors());

// Check to ensure this is declared

const blueprintRoutes = require('./routes/savedBlueprints');
const seatingRoutes = require('./routes/seating');

// Other code...

// ... other middleware and configurations

app.use(bodyParser.json()); // Add this line to parse JSON request bodies







// Mongoose schema for Seating
// Seating Schema
// const seatingSchema = new mongoose.Schema({
//   enrollment: { type: String, required: true },
//   exams: [
//     {
//       subject: { type: String, required: true },
//       paperCode: { type: String, required: true },
//       subjectCode: { type: String, required: true },
//       date: { type: String, required: true },
//       time: { type: String, required: true },
//       seatNumber: { type: String, required: true },
//       roomNumber: { type: String, required: true }
//     }
//   ]
// });

// const Seating = mongoose.model('Seating', seatingSchema);

// API: Save seating data







// API: Get seating data by enrollment
// server.js or routes file


app.post('/api/seatings', async (req, res) => {
  try {
    const { enrollment, exams } = req.body;

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database not connected' });
    }

    // Check if seating already exists for this enrollment
    const existingSeating = await Seating.findOne({ enrollment });
    if (existingSeating) {
      return res.status(400).json({ message: 'Seating already exists for this enrollment' });
    }

    const newSeating = new Seating({ enrollment, exams });
    await newSeating.save();

    res.status(200).json(newSeating);
  } catch (error) {
    console.error('Error saving seating:', error.message);
    res.status(500).json({ message: 'Failed to save seating', error: error.message });
  }
});


app.get('/api/seatings/:enrollment', async (req, res) => {
  try {
    const { enrollment } = req.params;
    const data = await Seating.findOne({ enrollment });

    if (!data) {
      return res.status(404).json({ message: 'No seating found for this enrollment' });
    }

    // Respond with the exams array
    res.status(200).json(data.exams); // Exams array
  } catch (error) {
    console.error('Error fetching seating by enrollment:', error);
    res.status(500).json({ message: 'Error fetching seating data', error: error.message });
  }
});

// API: Get all seating records
app.get('/api/seatings', async (req, res) => {
  try {
    const seatings = await Seating.find();  // Fetch all seatings
    if (!seatings.length) {
      return res.status(404).json({ message: 'No seating records found.' });
    }
    res.json({ seatings });
  } catch (error) {
    console.error('Error fetching all seatings:', error);
    res.status(500).json({
      message: 'Error fetching seatings',
      error: error.message || error,
    });
  }
});

// PUT /api/seating/:enrollment
// PUT /api/seating/:enrollment
app.put('/api/seatings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { exams } = req.body;

    console.log('🔁 PUT /api/seatings/:id called');
    console.log('👉 ID:', id);
    console.log('📦 Received exams:', exams);

    // Check if exams is a valid array
    if (!exams || !Array.isArray(exams) || exams.length === 0) {
      return res.status(400).json({
        message: 'Exams must be a non-empty array'
      });
    }

    // Additional validation: Check each exam object
    for (let exam of exams) {
      if (!exam.subjectCode || !exam.date || !exam.time) {
        return res.status(400).json({
          message: 'Each exam must have subjectCode, date, and time'
        });
      }
    }

    // Perform update
    const updatedSeating = await Seating.findByIdAndUpdate(
      id,
      { exams },
      { new: true, runValidators: true }
    );

    // Check if document exists
    if (!updatedSeating) {
      return res.status(404).json({ message: 'Seating record not found' });
    }

    res.status(200).json({
      message: 'Seating updated successfully',
      data: updatedSeating
    });

  } catch (error) {
    console.error('❌ Error updating seating:', error.message);
    res.status(500).json({
      message: 'Error updating seating',
      error: error.message
    });
  }
});



// DELETE /api/seating/:enrollment
// DELETE /api/seating/:enrollment
app.delete('/api/seatings/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Extract the ID from the URL

    // Attempt to find and delete the seating by ID
    const deletedSeating = await Seating.findByIdAndDelete(id);

    if (!deletedSeating) {
      return res.status(404).json({ message: 'Seating not found' });
    }

    res.status(200).json({ message: 'Seating deleted successfully' });
  } catch (error) {
    console.error('Error deleting seating:', error);
    res.status(500).json({ message: 'Error deleting seating', error });
  }
});





// Other code...

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/seatingDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });







// Middleware


app.use(express.urlencoded({ extended: true }));
app.use("/api", blueprintRoutes);

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// server.js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Server error", error: err.message });
});


// Ensure gallery folder exists
const galleryDir = path.join(__dirname, 'uploads/gallery');
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir);
}

// Serve uploaded files for gallery images
app.use('/uploads/gallery', express.static(path.join(__dirname, 'uploads/gallery')));
app.use('/uploads', express.static(uploadDir)); // Serve all uploads


app.use(express.static(path.join(__dirname, "client", "build")));



// Other imports and middleware...
// app.use("/api/blueprints", blueprintRoutes); // ✅ Use the imported one
const studentRoutes = require('./routes/students');





// ======================================
// 📦 Student Schema and Routes
// ======================================
// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   enrollment: { type: String, required: true, unique: true },
//   branch: { type: String, required: true },
//   semester: { type: String, required: true },
//   year: { type: String, required: true },
//   photo: { type: String, required: true },
// });

// const Student = mongoose.model('Student', studentSchema);

// Multer for student photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });



// Add student
// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollment: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  year: { type: String, required: true },
  photo: { type: String, required: true }
});

// Define the Student Model
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

// API Route to Add Student
app.post('/api/students', upload.single('photo'), async (req, res) => {
  try {
    const { name, enrollment, branch, semester, year } = req.body;
    const photo = req.file?.filename; // Getting the photo filename

    if (!photo) {
      return res.status(400).json({ message: '❌ Photo is required!' });
    }

    // Create a new student
    const newStudent = new Student({
      name,
      enrollment,
      branch,
      semester,
      year,
      photo
    });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({ message: '✅ Student added successfully!' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
});




// Get students
app.get('/students', async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// API Route to Update a Student
app.put('/api/students/:enrollment', upload.single('photo'), async (req, res) => {
  try {
    const { enrollment } = req.params;
    const { name, branch, semester, year } = req.body;
    const photo = req.file?.filename;

    // Find student by enrollment and update
    const updatedStudent = await Student.findOneAndUpdate(
      { enrollment }, // Find the student by their enrollment number
      { name, branch, semester, year, photo }, // Update with new data
      { new: true } // Return the updated student
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: '❌ Student not found!' });
    }

    res.status(200).json({ message: '✅ Student updated successfully!', student: updatedStudent });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
});

// Delete student

// DELETE student by enrollment number
studentRoutes.delete('/:enrollment', async (req, res) => {
  const { enrollment } = req.params;  // Get the student's enrollment number from the URL
  try {
    // Find and delete the student
    const deletedStudent = await Student.findOneAndDelete({ enrollment });

    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Now, delete the photo if it exists
    const photoPath = path.join(uploadDir, deletedStudent.photo); // Make sure `photo` field exists
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);  // Delete the photo file
    }

    res.json({ success: true, message: 'Student deleted successfully!' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ success: false, message: 'Error deleting student', error: err.message });
  }
});




app.use('/images', express.static(path.join(__dirname, 'uploads')));


app.use('/api/students', studentRoutes);



app.use(seatRoutes);



// ======================================
// 📦 Timetable Schema and Routes
// ======================================

const timetableSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  subjects: [
    {
      subjectName: { type: String, required: true },
      subjectCode: { type: String, required: true },
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});


const Timetable = mongoose.model('Timetable', timetableSchema);

// Timetable Routes
const timetableRoutes = express.Router();

// Get all timetables
timetableRoutes.get('/', async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json({ success: true, timetables });
  } catch (err) {
    console.error('Error fetching timetables:', err);
    res.status(500).json({ success: false, message: 'Error fetching timetables' });
  }
});


// Add new timetable
timetableRoutes.post('/', async (req, res) => {
  const { branch, semester, subjects } = req.body;

  try {
    const newTimetable = new Timetable({ branch, semester, subjects });
    await newTimetable.save();
    res.status(201).json({ success: true, message: 'Timetable added successfully!', timetable: newTimetable });
  } catch (err) {
    console.error('Error adding timetable:', err);
    res.status(500).json({ success: false, message: 'Error adding timetable', error: err.message });
  }
});

// Update timetable by ID
timetableRoutes.put('/:id', async (req, res) => {
  const { branch, semester, subjects } = req.body;
  const timetableId = req.params.id;

  try {
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      timetableId,
      { branch, semester, subjects },
      { new: true }
    );

    if (!updatedTimetable) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }

    res.json({ success: true, message: 'Timetable updated successfully!', timetable: updatedTimetable });
  } catch (err) {
    console.error('Error updating timetable:', err);
    res.status(500).json({ success: false, message: 'Error updating timetable', error: err.message });
  }
});

// Delete timetable by ID
timetableRoutes.delete('/:id', async (req, res) => {
  const timetableId = req.params.id;

  try {
    const deletedTimetable = await Timetable.findByIdAndDelete(timetableId);

    if (!deletedTimetable) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }

    res.json({ success: true, message: 'Timetable deleted successfully!' });
  } catch (err) {
    console.error('Error deleting timetable:', err);
    res.status(500).json({ success: false, message: 'Error deleting timetable', error: err.message });
  }
});

// Use the timetable routes
app.use('/api/timetables', timetableRoutes);

// Room Schema
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  floor: { type: String, required: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  total_seats: { type: Number, default: 0 }, // Optional, will be calculated before saving
});

// Pre-save hook to calculate total_seats based on rows and columns
roomSchema.pre('save', function (next) {
  if (this.rows && this.columns) {
    this.total_seats = this.rows * this.columns; // Calculate total seats
  }
  next();
});

// Room model
const Room = mongoose.model('Room', roomSchema);

// Room Routes
const roomRoutes = express.Router();

// Get all rooms (admin)
roomRoutes.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
});

// Add a new room
roomRoutes.post('/', async (req, res) => {
  const { roomNumber, floor, rows, columns } = req.body;

  try {
    const newRoom = new Room({ roomNumber, floor, rows, columns });
    await newRoom.save(); // The pre-save hook will calculate total_seats
    res.status(201).json({ success: true, message: 'Room added successfully!', room: newRoom });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ success: false, message: 'Failed to add room' });
  }
});

// Update a room (admin)
roomRoutes.put('/:id', async (req, res) => {
  const { roomNumber, floor, rows, columns } = req.body;
  const roomId = req.params.id;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { roomNumber, floor, rows, columns },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({ success: true, message: 'Room updated successfully!', room: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ success: false, message: 'Failed to update room' });
  }
});

// Delete a room (admin)
roomRoutes.delete('/:id', async (req, res) => {
  const roomId = req.params.id;

  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({ success: true, message: 'Room deleted successfully!' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ success: false, message: 'Failed to delete room' });
  }
});

// Use room routes
app.use('/api/rooms', roomRoutes);




// Blueprint Schema
const blueprintSchema = new mongoose.Schema({
  roomId: String,
  blueprint: Array,
  branches: Array,
  createdAt: { type: Date, default: Date.now },
});

const Blueprint = mongoose.model("Blueprint", blueprintSchema);

// Endpoint to save blueprint
app.post("/api/saveBlueprint", async (req, res) => {
  try {
    const { roomId, blueprint, branches } = req.body;
    const newBlueprint = new Blueprint({ roomId, blueprint, branches });
    await newBlueprint.save();
    res.status(200).json({ message: "Blueprint saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error saving blueprint" });
  }
});

// Endpoint to get saved blueprints
app.get("/api/saveBlueprint", async (req, res) => {
  try {
    const blueprints = await Blueprint.find();
    res.status(200).json(blueprints);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blueprints" });
  }
});

// Endpoint to delete blueprint
// Endpoint to delete blueprint
app.delete("/api/saveBlueprint/:id", async (req, res) => {
  try {
    const blueprintId = req.params.id;
    await Blueprint.findByIdAndDelete(blueprintId);
    res.status(200).json({ message: "Blueprint deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting blueprint" });
  }
});

// Endpoint to update blueprint
app.put("/api/saveBlueprint/:id", async (req, res) => {
  try {
    const blueprintId = req.params.id;
    const { blueprint, branches } = req.body;
    const updatedBlueprint = await Blueprint.findByIdAndUpdate(
      blueprintId,
      { blueprint, branches },
      { new: true }
    );
    res.status(200).json({ message: "Blueprint updated successfully!", updatedBlueprint });
  } catch (err) {
    res.status(500).json({ error: "Error updating blueprint" });
  }
});








// ======================================
// ✉️ Contact Message Schema and Routes
// ======================================
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  created_at: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

const contactRoutes = express.Router();

// Save message
contactRoutes.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Get all messages (admin)
contactRoutes.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ created_at: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// Delete a message
contactRoutes.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

app.use('/api/contact', contactRoutes);

// ======================================
// 📸 Gallery Schema and Routes
// ======================================
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

// Multer for gallery image upload
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads/gallery/')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const galleryUpload = multer({ storage: galleryStorage });

const galleryRoutes = express.Router();

// Add gallery item
galleryRoutes.post('/', galleryUpload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!image) {
    return res.status(400).json({ message: 'Image is required' });
  }

  try {
    const newGalleryItem = new Gallery({ title, description, image });
    await newGalleryItem.save();
    res.status(201).json({ success: true, message: 'Gallery item added successfully!', gallery: newGalleryItem });
  } catch (err) {
    console.error('Error adding gallery item:', err);
    res.status(500).json({ success: false, message: 'Error adding gallery item', error: err.message });
  }
});

// Get all gallery items (admin)
galleryRoutes.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    const updatedGalleryItems = galleryItems.map(item => ({
      ...item.toObject(),
      imageUrl: `/uploads/gallery/${item.image}`
    }));
    res.json({ success: true, galleryItems: updatedGalleryItems });
  } catch (err) {
    console.error('Error fetching gallery items:', err);
    res.status(500).json({ success: false, message: 'Error fetching gallery items' });
  }
});

// Delete gallery item

// const fs = require('fs').promises;  // Use fs.promises to work with async/await

const getFilePath = (eventId, imageName) => {
  // Ensure that both eventId and imageName are provided and valid
  if (!eventId || !imageName) {
    console.error('Invalid eventId or imageName');
    return null;  // Return null if either value is empty
  }

  return path.join(__dirname, 'uploads', 'gallery', `${eventId}-${imageName}`);
}

// Example event data (replace this with actual data from your database)
const eventId = '1746187153765';  // Replace with actual event ID
const imageName = '26.jpg';        // Replace with actual image name

// Get the file path dynamically
const filePath = getFilePath(eventId, imageName);

if (filePath) {
  // Delete the file if the path is valid
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return;  // Exit if there's an error
    }
    console.log('File deleted successfully');
  });
} else {
  console.error('Invalid file path, cannot delete file');
}








// Delete gallery item
galleryRoutes.delete('/:id', async (req, res) => {
  try {
    // Find the gallery item by ID
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      console.log('Gallery item not found:', req.params.id);
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // Define the path to the image file
    const imagePath = path.join(__dirname, 'uploads', 'gallery', galleryItem.image);
    console.log('Image path:', imagePath);  // Add this to verify the path

    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      console.log('File does not exist:', imagePath);
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Try to delete the image file from the server
    await fs.promises.unlink(imagePath);  // Use promises for async unlink
    console.log('Image file deleted:', imagePath);

    // Delete the gallery item from the database using deleteOne()
    await galleryItem.deleteOne();
    res.json({ success: true, message: 'Gallery item deleted successfully!' });
  } catch (err) {
    console.error('Error deleting gallery item:', err);
    res.status(500).json({ success: false, message: 'Error deleting gallery item', error: err.message });
  }
});



// Update gallery item
galleryRoutes.put('/:id', galleryUpload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // Update fields
    galleryItem.title = title || galleryItem.title;
    galleryItem.description = description || galleryItem.description;
    if (image) {
      // Delete the old image if a new image is uploaded
      const oldImagePath = path.join(__dirname, 'uploads', 'gallery', galleryItem.image);
      if (fs.existsSync(oldImagePath)) {
        await fs.promises.unlink(oldImagePath);  // Use promises for async unlink
      }
      galleryItem.image = image;
    }

    // Save the updated gallery item
    await galleryItem.save();
    res.json({ success: true, message: 'Gallery item updated successfully!', gallery: galleryItem });
  } catch (err) {
    console.error('Error updating gallery item:', err);
    res.status(500).json({ success: false, message: 'Error updating gallery item', error: err.message });
  }
});












//

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find(); // Use the model
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// This is your seating POST endpoint
app.get('/api/student/seating/:enrollment/:examId', (req, res) => {
  const { enrollment, examId } = req.params;

  // Example logic to find seating by enrollment number and exam ID
  // Replace this with your actual database logic.
  const seatingData = getSeatingDataFromDB(enrollment, examId);

  if (!seatingData) {
    return res.status(404).send('Seating data not found');
  }

  res.json(seatingData);
});


app.use('/api/gallery', galleryRoutes);
app.use('/api/blueprints', blueprintRoutes);


app.use('/api/seating', seatingRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Welcome to the Exam & Academic Management System API 🚀');
});
