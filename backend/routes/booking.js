const express = require('express');
const Booking = require('../models/Booking.js');  // Ensure you import the correct Booking model
const { verifyUser, verifyAdmin } = require('../utils/verifyToken.js');
const router = express.Router();

// Create a new booking
router.post('/', verifyUser, async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({ success: true, message: "Your tour is booked", data: savedBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });  // Correct status code and success flag
    }
});

// Get single booking
router.get('/:id', verifyUser, async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Booking.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({
            success: true,
            message: "Successful",
            data: book
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });  // Correct status code and success flag
    }
});

// Get all bookings
router.get('/', verifyAdmin, async (req, res) => {  // Changed endpoint to avoid conflict
    try {
        const books = await Booking.find();
        res.status(200).json({
            success: true,
            message: "Successful",
            data: books
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });  // Correct status code and success flag
    }
});

module.exports = router;
