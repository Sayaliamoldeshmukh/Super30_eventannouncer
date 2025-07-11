const express = require('express');
const router = express.Router();
const db = require('../db');
const path = require('path');
const multer = require('multer');

// ===== Multer Storage Config =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ===== Middleware: Only Club Admins Allowed =====
function isClubAdmin(req, res, next) {
  const user = req.session.user;
  if (user && user.role === 'club_admin') {
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

// ===== Create New Event =====
router.post('/events', isClubAdmin, upload.single('poster'), async (req, res) => {
  const { title, description, date, time, location } = req.body;
  const created_by = req.user.id;
  const club_name = req.user.club_name;
  const poster = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !date || !time || !location) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await db.execute(
      'INSERT INTO events (title, description, date, time, location, poster, created_by, club_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, date, time, location, poster, created_by, club_name]
    );
    res.json({ message: 'Event created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating event' });
  }
});

// ===== Edit Event (with optional new poster) =====
router.put('/event/:eventId', isClubAdmin, upload.single('poster'), async (req, res) => {
  const eventId = req.params.eventId;
  const allowedFields = ['title', 'description', 'date', 'time', 'location'];
  const updateFields = [];
  const values = [];

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateFields.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (req.file) {
    updateFields.push('poster = ?');
    values.push(`/uploads/${req.file.filename}`);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ message: 'No fields provided for update' });
  }

  values.push(eventId);
  const query = `UPDATE events SET ${updateFields.join(', ')} WHERE id = ?`;

  try {
    await db.execute(query, values);
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// ===== Get My Events =====
router.get('/my-events', isClubAdmin, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM events WHERE created_by = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// ===== Get Registrations =====
router.get('/event/:eventId/registrations', isClubAdmin, async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const [students] = await db.execute(
      `SELECT u.id, u.name, u.email FROM student_registrations sr
       JOIN users u ON sr.student_id = u.id
       WHERE sr.event_id = ?`,
      [eventId]
    );
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});

// ===== Delete Event =====
router.delete('/event/:eventId', isClubAdmin, async (req, res) => {
  const eventId = req.params.eventId;
  try {
    await db.execute('DELETE FROM events WHERE id = ?', [eventId]);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;