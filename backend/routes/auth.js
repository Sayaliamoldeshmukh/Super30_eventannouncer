const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db'); // mysql2/promise connection

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phone, department, role, club_name } = req.body;
  console.log("📥 Signup endpoint hit:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password, phone, department, role, club_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, department, role, club_name || null]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Signup failed:', error.message);
    res.status(500).json({ message: error.message || 'Server error during signup' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      role: user.role,
      club_name: user.club_name
    };

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
