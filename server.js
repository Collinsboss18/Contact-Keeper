const express = require('express');
const log = require('bunyan').createLogger({ name: 'Contact Keeper' });
const path = require('path');
const http = require('http');
const cluster = require('cluster');
const cpus = require('os').cpus().length;
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

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

if (cluster.isMaster) {
	log.info(`Master ${process.pid} is running`);
	for (let i = 0; i < cpus; i++) cluster.fork();
	cluster.on('exit', (worker, code, signal) => {
		log.info(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const server = http.createServer(app);
	server.listen(PORT, () => log.info('Server started at PORT: ', PORT));
}

// const server = http.createServer(app);
// server.listen(PORT, () => log.info('Server started at PORT: ', PORT));