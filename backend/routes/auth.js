const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs'); // ✅ This works with your installed package

const db = require('../db'); // your mysql2/promise db

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phone, department, role, club_name } = req.body;
  console.log("📥 Signup endpoint hit");
  console.log("Request body:", req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password, phone, department, role, club_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, department, role, club_name || null]  // ✅ Ensure club_name is included
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});
console.log("Signup request received:", req.body);

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

    // ✅ This sets the session
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
