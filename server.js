/* eslint-disable no-console */
import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import config from './config.js';
import hemlet from 'helmet';

const app = express();

app.use(hemlet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log('Request body', req.body);
		const dest = `${config.destination}/${req.body.portal}/${req.body.id}`;
		fs.mkdirsSync(dest);
		cb(null, dest);
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage }).single('file');
app.use(upload);

app.get('/', (_, res) => {
	res.send('Hello World!');
});

app.get('/config', (_, res) => {
	res.send(config);
});

// Save file
app.post('/submit', (req, res) => {
	console.log(req.body);
	upload(req, res, (err) => {
		if (err) console.log(err);
	});
	res.send('Data saved');
});

app.listen(config.port, () => {
	console.log(`Hermes is listening at http://localhost:${config.port}`);
});
