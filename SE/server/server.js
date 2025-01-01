// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS for cross-origin requests (if needed)
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Create an Express application
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable CORS for all origins (you can configure it further)

// MongoDB connection
mongoose.connect('mongodb+srv://jmanchandabe22:jini@teaching.f5anf.mongodb.net/Project?retryWrites=true&w=majority&appName=teaching', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Define the Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Create the Student Model
const Student = mongoose.model('Student', studentSchema);

// POST route to handle registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate the data
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if email already exists
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student record
        const newStudent = new Student({
            name,
            email,
            password: hashedPassword, // Save the hashed password
        });

        // Save the student to the database
        await newStudent.save();

        // Respond with a success message
        res.status(201).json({ message: 'Student registered successfully!' });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ error: 'Failed to register student' });
    }
});

// POST route for login (optional, in case you want to add authentication)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate the data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find user by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token for authentication (optional, for session management)
        const token = jwt.sign({ id: student._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send response with token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
