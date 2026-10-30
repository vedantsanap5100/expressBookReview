const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customerRoutes = require('./router/auth_users.js').authenticated;
const generalRoutes = require('./router/general.js').general;

const app = express();
app.use(express.json());

app.use('/customer', session({
  secret: 'fingerprint_customer',
  resave: true,
  saveUninitialized: true
}));

app.use('/customer/auth/*', (req, res, next) => {
  if (!req.session.authorization) {
    return res.status(403).json({ message: 'User not logged in' });
  }
  const token = req.session.authorization.accessToken;
  jwt.verify(token, 'access', (err, user) => {
    if (err) return res.status(403).json({ message: 'User not authenticated' });
    req.user = user;
    next();
  });
});

app.use('/customer', customerRoutes);
app.use('/', generalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
