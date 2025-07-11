const express = require('express');
const router = express.Router();
const db = require('../db'); // Or wherever your MySQL pool/connection is

// Middleware to check if student is logged in
const isStudent = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'student') {
    return res.status(401).json({ message: 'You must log in as a student' });
  }
  next();
};

// Register for an event
router.post('/register/:eventId', isStudent, async (req, res) => {
  const studentId = req.session.user.id;
  const eventId = req.params.eventId;

  try {
    // Check if already registered
    const [existing] = await db.promise().query(
      'SELECT * FROM registrations WHERE student_id = ? AND event_id = ?',
      [studentId, eventId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already registered' });
    }

    // Insert into registrations table
    await db.promise().query(
      'INSERT INTO registrations (student_id, event_id) VALUES (?, ?)',
      [studentId, eventId]
    );

    res.status(200).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Error in register route:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// // Middleware to check if user is student
// function isStudent(req, res, next) {
//   const user = req.session.user;
//   if (user && user.role === 'student') {
//     req.user = user;
//     next();
//   } else {
//     return res.status(403).json({ message: 'Forbidden - Only students can register' });
//   }
// }