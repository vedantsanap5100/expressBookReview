# Express Book Review – Final Project

This is a compact Node.js + Express implementation for the book-review assignment. It includes public book retrieval routes, registration/login, review CRUD, and Axios-based async/await helpers.

## Important before submission
- This ZIP is a prepared project template, **not a GitHub fork**. Task 1 requires your GitHub repository to be an actual fork of `ibm-developer-skills-network/expressBookReviews` (note the plural name in the current IBM repository).
- The assignment says a provided JSON file will be used by the grader. Replace `data/books.json` with the exact provided book data and preserve its expected schema before submitting.
- User accounts and reviews are held in memory for this learning demo and reset when the server restarts. Do not use this as a production service.
- Test every command and paste your real terminal output into the matching submission file. Do not submit example output as if it were run.

## Run
```bash
npm install
npm start
```
Server: `http://localhost:5000`

## Routes
- `GET /` – all books
- `GET /isbn/:isbn` – book by ISBN
- `GET /author/:author` – books by author
- `GET /title/:title` – books by title
- `GET /review/:isbn` – reviews for a book
- `POST /customer/register` – register
- `POST /customer/login` – login
- `PUT /customer/auth/review/:isbn` – add/update your review (authenticated)
- `DELETE /customer/auth/review/:isbn` – delete your review (authenticated)

## cURL examples
Run these in a second terminal while the server is running. The ISBNs/authors/titles below match the sample `data/books.json`; change them if you replace the data file.

### Q1 githubrepo (verify your actual GitHub fork)
```bash
curl -H "Accept: application/vnd.github+json" https://api.github.com/repos/YOUR_GITHUB_USERNAME/expressBookReviews
```
Check for `"fork": true` and `parent.full_name` equal to `ibm-developer-skills-network/expressBookReviews`.

### Q2 getallbooks
```bash
curl http://localhost:5000/
```

### Q3 getbooksbyISBN
```bash
curl http://localhost:5000/isbn/9780140449136
```

### Q4 getbooksbyauthor
```bash
curl "http://localhost:5000/author/George%20Orwell"
```

### Q5 getbooksbytitle
```bash
curl "http://localhost:5000/title/1984"
```

### Q6 getbookreview
```bash
curl http://localhost:5000/review/9780140449136
```

### Q7 register
```bash
curl -X POST http://localhost:5000/customer/register -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"Pass1234\"}"
```

### Q8 login
```bash
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"Pass1234\"}"
```
Copy the returned token for the next commands. The app uses a session cookie as well as returning a token; use the cookie jar below for authenticated commands:
```bash
curl -c cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"Pass1234\"}"
```

### Q9 reviewadded
```bash
curl -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/9780140449136 -H "Content-Type: application/json" -d "{\"review\":\"Excellent book!\"}"
```

### Q10 deletereview
```bash
curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/9780140449136
```

## Q11 general.js URL
The Axios helper file in this project is `general.js` at the project root. After uploading to your own public repository, submit its actual GitHub URL, for example:
`https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY/blob/main/general.js`
