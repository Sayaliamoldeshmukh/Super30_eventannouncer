const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to check if user is logged in
function checkLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized - Please login' });
  }
}

// Middleware to check if user is student
function isStudent(req, res, next) {
  const user = req.session.user;
  if (user && user.role === 'student') {
    req.user = user;
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden - Only students can register' });
  }
}


// GET /api/student/registered
router.get('/registered', checkLoggedIn, isStudent, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT event_id FROM student_registrations WHERE student_id = ?',
      [req.user.id]
    );
    const eventIds = rows.map(row => row.event_id);
    res.json(eventIds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

// POST /api/student/register/:eventId
router.post('/register/:eventId', checkLoggedIn, isStudent, async (req, res) => {
  const studentId = req.user.id;
  const eventId = req.params.eventId;

  try {
    const [existing] = await db.execute(
      'SELECT * FROM student_registrations WHERE student_id = ? AND event_id = ?',
      [studentId, eventId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already registered' });
    }

    await db.execute(
      'INSERT INTO student_registrations (student_id, event_id) VALUES (?, ?)',
      [studentId, eventId]
    );
    res.json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;
