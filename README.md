# IBM Express Book Reviews – corrected project

This project follows the IBM `expressBookReviews` starter layout and its 10-book sample data.

## Setup
```bash
npm install
npm start
```
Server runs at `http://localhost:5000`.

## API routes
- `GET /` – all 10 books
- `GET /isbn/1` – book with key 1 (the IBM starter calls this ISBN)
- `GET /author/Jane%20Austen`
- `GET /title/Pride%20and%20Prejudice`
- `GET /review/1`
- `POST /customer/register`
- `POST /customer/login`
- `PUT /customer/auth/review/1`
- `DELETE /customer/auth/review/1`

## Test commands (PowerShell or terminal with curl)

Use a terminal window for the server and a second terminal for the commands.

### Q1 – verify the repository is a fork
```bash
curl -H "Accept: application/vnd.github+json" https://api.github.com/repos/vedantsanap5100/expressBookReviews | jq '.parent.full_name'
```
This must show `"ibm-developer-skills-network/expressBookReviews"`. This only works if the GitHub repo is an actual fork; uploading files to a new repository does not make it a fork.

### Q2 – all books
```bash
curl http://localhost:5000/
```

### Q3 – book by ISBN/key
```bash
curl http://localhost:5000/isbn/1
```

### Q4 – books by author
```bash
curl "http://localhost:5000/author/Jane%20Austen"
```

### Q5 – books by title
```bash
curl "http://localhost:5000/title/Pride%20and%20Prejudice"
```

### Q6 – review for a book
```bash
curl http://localhost:5000/review/1
```
With no reviews yet, expected response: `{"message":"No reviews found for this book."}`

### Q7 – register
```bash
curl -X POST http://localhost:5000/customer/register -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"Pass1234\"}"
```
Expected response: `{"message":"User successfully registered. Now you can login"}`

### Q8 – login and save session cookie
```bash
curl -c cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"Pass1234\"}"
```
Expected response: `{"message":"Login successful!"}`

### Q9 – add review (same cookie jar from login)
```bash
curl -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/1 -H "Content-Type: application/json" -d "{\"review\":\"Great book!\"}"
```
Expected response includes `{"message":"Review added/updated successfully","reviews":{"student1":"Great book!"}}`.

### Q10 – delete review
```bash
curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1
```
Expected response: `{"message":"Review for ISBN 1 deleted"}`

## Q11 – Axios implementation
The root `general.js` contains async/await Axios functions for all books, ISBN, author and title lookups, with error handling. After uploading this file to your public GitHub repository, submit the URL to that exact file, for example:
`https://github.com/vedantsanap5100/expressBookReviews/blob/main/general.js`

## Important
- The `submissions/` folder contains evidence placeholders. Replace each with your actual cURL command and actual terminal response after running the server. Do not claim example output is real output.
- Task 1 requires an actual GitHub fork. A ZIP upload cannot create the fork relationship.
