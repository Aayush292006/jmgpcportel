import nextConnect from 'next-connect';
import multer from 'multer';
import mongoose from 'mongoose';
import Student from '../../models/student'; // your mongoose model
import dbConnect from '../../lib/dbConnect'; // your MongoDB connect function

// Configure multer storage
const storage = multer.diskStorage({
  destination: './public/uploads/', // ensure this folder exists
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single('photo')); // "photo" matches the frontend field name

apiRoute.post(async (req, res) => {
  await dbConnect();

  const { name, enrollment, branch, semester, year } = req.body;

  try {
    const existing = await Student.findOne({ enrollment });
    if (existing) {
      return res.status(400).json({ message: 'Enrollment number already exists' });
    }

    const newStudent = new Student({
      name,
      enrollment,
      branch,
      semester,
      year,
      photo: `/uploads/${req.file.filename}`, // save relative path to image
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add student' });
  }
});

export const config = {
  api: {
    bodyParser: false, // Important: disable default body parser for multer
  },
};

export default apiRoute;
