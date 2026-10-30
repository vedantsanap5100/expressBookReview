const express = require('express');
const books = require('./booksdb.js');
const publicUsers = express.Router();

// Get all books
publicUsers.get('/', (req, res) => res.status(200).json(books));

// Get a book by ISBN (the IBM sample data uses keys 1 through 10)
publicUsers.get('/isbn/:isbn', (req, res) => {
  const isbn = String(req.params.isbn);
  if (!books[isbn]) return res.status(404).json({ message: 'Book not found' });
  return res.status(200).json(books[isbn]);
});

// Get books by author
publicUsers.get('/author/:author', (req, res) => {
  const author = decodeURIComponent(req.params.author).toLowerCase();
  const matches = Object.entries(books)
    .filter(([, book]) => book.author.toLowerCase() === author)
    .map(([isbn, book]) => ({ isbn, ...book }));
  return res.status(200).json(matches);
});

// Get books by title
publicUsers.get('/title/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title).toLowerCase();
  const matches = Object.entries(books)
    .filter(([, book]) => book.title.toLowerCase() === title)
    .map(([isbn, book]) => ({ isbn, ...book }));
  return res.status(200).json(matches);
});

// Get reviews for a book
publicUsers.get('/review/:isbn', (req, res) => {
  const isbn = String(req.params.isbn);
  if (!books[isbn]) return res.status(404).json({ message: 'Book not found' });
  const reviews = books[isbn].reviews;
  if (Object.keys(reviews).length === 0) {
    return res.status(200).json({ message: 'No reviews found for this book.' });
  }
  return res.status(200).json(reviews);
});

module.exports.general = publicUsers;
