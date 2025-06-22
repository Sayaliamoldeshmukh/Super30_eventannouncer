require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); // ✅ Use MySQL session store
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.onrender.com'],// replace with actual deployed frontend
  credentials: true
}));

// ✅ MySQL session store configuration
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET || 'secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is live on Render with MySQL session!');
});

// ✅ Always start server — Render requires binding to PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
