require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Your routes
app.get('/', (req, res) => {
  res.send('✅ Backend is live on Render!');
});

// This is needed for local dev
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Local server running on http://localhost:${PORT}`);
  });
}

// Required for Render
module.exports = app;
