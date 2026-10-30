/*
 * Axios client helpers for the assignment's book-retrieval criteria.
 * Start the Express server first (npm start), then call these functions.
 */
const axios = require('axios');
const API = process.env.BOOK_API_URL || 'http://localhost:5000';

async function getAllBooks() {
  const response = await axios.get(`${API}/`);
  return response.data;
}

async function getBooksByISBN(isbn) {
  const response = await axios.get(`${API}/isbn/${encodeURIComponent(isbn)}`);
  return response.data;
}

async function getBooksByAuthor(author) {
  const response = await axios.get(`${API}/author/${encodeURIComponent(author)}`);
  return response.data;
}

async function getBooksByTitle(title) {
  const response = await axios.get(`${API}/title/${encodeURIComponent(title)}`);
  return response.data;
}

async function getBookReview(isbn) {
  const response = await axios.get(`${API}/review/${encodeURIComponent(isbn)}`);
  return response.data;
}

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview
};
