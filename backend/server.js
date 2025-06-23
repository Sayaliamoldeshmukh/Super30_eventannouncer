require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const path = require('path');
const app = express();

// ✅ Middleware: Parse JSON
app.use(express.json());

// ✅ CORS Setup for both local + deployed frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://super30-eventannouncer.vercel.app'],
  
  credentials: true
}));

// ✅ Serve static files from /uploads (for event posters)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MySQL session store
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// ✅ Session Middleware
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true for HTTPS (Render)
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// ✅ ROUTES
const authRoutes = require('./routes/auth');
const clubAdminRoutes = require('./routes/clubAdmin');
const studentRoutes = require('./routes/student');
const eventRoutes = require('./routes/events');

app.use('/api/auth', authRoutes);
app.use('/api/clubAdmin', clubAdminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/events', eventRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('✅ Backend is live on Render with MySQL session!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
