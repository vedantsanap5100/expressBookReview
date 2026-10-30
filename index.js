const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const generalRoutes = require('./router/general');
const authRoutes = require('./router/auth_users');

const app = express();
app.use(express.json());
app.use('/customer', session({
  secret: process.env.SESSION_SECRET || 'change-this-session-secret',
  resave: false,
  saveUninitialized: false
}));

app.use('/customer/auth', (req, res, next) => {
  const token = req.session.token;
  if (!token) return res.status(401).json({ message: 'Please log in first' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'change-this-jwt-secret');
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.use('/', generalRoutes);
app.use('/customer', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Book review API running at http://localhost:${PORT}`));
