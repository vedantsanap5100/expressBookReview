const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');
const regdUsers = express.Router();
const users = [];

const isValid = (username) => users.some((user) => user.username === username);
const authenticatedUser = (username, password) =>
  users.some((user) => user.username === username && user.password === password);

// Register
regdUsers.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  if (isValid(username)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  return res.status(200).json({ message: 'User successfully registered. Now you can login' });
});

// Login
regdUsers.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const accessToken = jwt.sign({ username }, 'access', { expiresIn: '1h' });
  req.session.authorization = { accessToken };
  return res.status(200).json({ message: 'Login successful!' });
});

// Add or update a review
regdUsers.put('/auth/review/:isbn', (req, res) => {
  const isbn = String(req.params.isbn);
  if (!books[isbn]) return res.status(404).json({ message: 'Book not found' });
  const review = req.body && req.body.review;
  if (typeof review !== 'string' || !review.trim()) {
    return res.status(400).json({ message: 'Review is required' });
  }
  books[isbn].reviews[req.user.username] = review;
  return res.status(200).json({
    message: 'Review added/updated successfully',
    reviews: books[isbn].reviews
  });
});

// Delete the logged-in user's review
regdUsers.delete('/auth/review/:isbn', (req, res) => {
  const isbn = String(req.params.isbn);
  if (!books[isbn]) return res.status(404).json({ message: 'Book not found' });
  if (!Object.prototype.hasOwnProperty.call(books[isbn].reviews, req.user.username)) {
    return res.status(404).json({ message: 'No review found for this user' });
  }
  delete books[isbn].reviews[req.user.username];
  return res.status(200).json({ message: `Review for ISBN ${isbn} deleted` });
});

module.exports.authenticated = regdUsers;
module.exports.isValid = isValid;
module.exports.users = users;
