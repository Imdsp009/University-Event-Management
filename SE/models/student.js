const mongoose = require('mongoose');

// Define the schema for a student
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name is required
    email: { type: String, required: true, unique: true }, // Email is required and must be unique
    password: { type: String, required: true }, // Password is required
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('Student', studentSchema);
