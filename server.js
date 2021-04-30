/* eslint-disable no-console */
import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import config from './config.js';

const app = express();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(req.body);
		const dest = `${config.destination}/${req.body.exam}/${req.body.id}`;
		fs.mkdirsSync(dest);
		cb(null, dest);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/config', (req, res) => {
	res.send(config);
});

// Save file
app.post('/submit', (req, res) => {
	const upload = multer({ storage });
	upload(req, res, (err) => {
		if (req.fileValidationError) {
			return res.send(req.fileValidationError);
		} else if (!req.file) {
			return res.send('Please select a valid file.');
		} else if (err instanceof multer.MulterError) {
			return res.send(err);
		} else if (err) {
			return res.send(err);
		} else if (config.portals.indexOf(req.body.exam) === -1) {
			res.send('Please select a valid portal for submission');
		}
	});
	res.send('Data saved');
});

app.listen(config.port, () => {
	console.log(`Hermes listening at http://localhost:${config.port}`);
});
