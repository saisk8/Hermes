/* eslint-disable no-console */
import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import config from './config.js';

const app = express();
const port = 3000;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(req.body);
		const dest = `./uploads/${req.body.exam}/${req.body.id}`;
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

const upload = multer({ storage });
// Save file
app.post('/submit', upload.any(), (req, res) => res.send('Data saved'));

app.listen(config.port, () => {
	console.log(`Hermes listening at http://localhost:${port}`);
});
