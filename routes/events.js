const express = require('express');
const router = express.Router();
const db = require('../db'); // Your MySQL connection

// GET /api/events/all - Fetch all events
router.get('/all', async (req, res) => {
  const query = 'SELECT * FROM events ORDER BY date ASC';

  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching events:', err.message);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

module.exports = router;
