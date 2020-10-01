const express = require('express'),
          app = express();

app.set('PORT', process.env.PORT || 5000);
app.get('/', (req, res) => {
    res.json({msg: 'Welcome'});
});

/** @action Define Routes */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const server = app.listen(app.get('PORT'), () => console.log(`Server running on PORT → ${server.address().port}`));
