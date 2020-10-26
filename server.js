const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Set Server Port
app.set('PORT', process.env.PORT || 5000);

// @action Connect to Database */
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

/** @action Define Routes */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve Static Assets For Production
if (process.env.NODE_ENV === 'production') {
  // Set Static Folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const server = app.listen(app.get('PORT'), () => console.log(`Server running on PORT → ${server.address().port}`));
