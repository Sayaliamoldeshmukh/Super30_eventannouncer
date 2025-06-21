const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const clubAdminRoutes = require('./routes/clubAdmin');
const eventRoutes = require('./routes/events'); // ✅ Added
const studentRoutes = require('./routes/student');
const path = require('path');


const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Session
app.use(session({
  secret: "yourSecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clubAdmin', clubAdminRoutes);
app.use('/api/events', eventRoutes); // ✅ Added
app.use('/api/student', studentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Protected Route Example
app.get('/api/dashboard', (req, res) => {
  if (req.session.user) {
    res.json({ message: `Welcome ${req.session.user.name}`, role: req.session.user.role });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
