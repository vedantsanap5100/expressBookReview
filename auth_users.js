const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const books = require('../data/books.json');
const router = express.Router();

const users = new Map();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
  if (users.has(username)) return res.status(409).json({ message: 'Username already exists' });
  const hash = await bcrypt.hash(password, 10);
  users.set(username, { password: hash });
  return res.status(201).json({ message: 'User successfully registered. Now you can login.' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  const user = users.get(username);
  if (!user || !(await bcrypt.compare(password || '', user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'change-this-jwt-secret', { expiresIn: '2h' });
  req.session.token = token;
  return res.json({ message: 'Login successful', token });
});

// Add or update own review for a book
router.put('/auth/review/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const { review } = req.body || {};
  if (!review) return res.status(400).json({ message: 'Review is required' });
  book.reviews[req.user.username] = review;
  return res.json({ message: 'Review added/updated successfully', reviews: book.reviews });
});

// Delete own review
router.delete('/auth/review/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (!book.reviews[req.user.username]) return res.status(404).json({ message: 'Review not found for this user' });
  delete book.reviews[req.user.username];
  return res.json({ message: 'Review deleted successfully', reviews: book.reviews });
});

module.exports = router;
