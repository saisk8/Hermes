// import inquirer from 'inquirer';
import axios from 'axios';
import { Command } from 'commander/esm.mjs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import formData from 'form-data';
import fs from 'fs-extra';
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';

const program = new Command();
const form = new formData();

const submit = (answers) => {
	form.append('portal', answers.portal);
	form.append('id', answers.id);
	form.append('file', fs.createReadStream(answers.filePath));

	axios
		.post(`http://${args.ip}:${args.port}/submit`, form, {
			headers: form.getHeaders(),
		})
		.then((response) => {
			console.log(response.data);
		});
};

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

program
	.requiredOption('-i --ip <ip>', 'IP address of the portal server')
	.requiredOption('-p --port <port>', 'Port of the portal server')
	.parse();
const args = program.opts();

console.log(chalk.blue('Fetching portal details from the server...'));
axios.get(`http://${args.ip}:${args.port}/config`).then(async (res) => {
	console.log(chalk.green('Portal details have been fetched.'));

	if (res.data.portals.length === 0) {
		return console.log(
			chalk.yellow('No portals are currently available. Submission aborted!')
		);
	}

	// Ask question as submit the file
	inquirer
		.prompt([
			{
				name: 'portal',
				message: 'Choose the portal you want to make the submission to',
				choices: res.data.portals,
				type: 'list',
			},
			{
				name: 'filePath',
				message: 'Enter the the path of the file you want to submit',
				type: 'file-tree-selection',
			},
			{
				name: 'id',
				message: 'What is your unique ID?',
			},
			{
				name: 'confirm',
				message: 'Do you want to submit the file?',
				type: 'confirm',
			},
		])
		.then((answers) => {
			if (!answers.confirm) {
				console.log(chalk.yellow('Submission aborted'));
				return;
			}
			submit(answers);
		});
});
