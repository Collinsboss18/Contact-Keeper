const mongoose = require('mongoose');
const	config = require('config');
const	db = config.get('mongoAtlasURI');
// const db = config.get('mongoLocalURI');
const log = require('bunyan').createLogger({ name: 'Contact Keeper' });

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		// console.log('MongoDB Connected...');
		log.info('Mongodb COnnected...')
	} catch (err) {
		// console.error(err.message);
		log.warn(err.message)
		process.exit(1);
	}
};
module.exports = connectDB;
