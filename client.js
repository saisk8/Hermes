// import inquirer from 'inquirer';
import axios from 'axios';
import { Command } from 'commander/esm.mjs';
import chalk from 'chalk';
import inquirer from 'inquirer';
const program = new Command();
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

program
	.requiredOption('-i --ip <ip>', 'IP address of the portal server')
	.requiredOption('-p --port <port>', 'Port of the portal server')
	.parse();
const args = program.opts();

console.log(chalk.blue('Fetching config from server...'));
axios.get(`http://${args.ip}:${args.port}/config`).then((res) => {
	console.log(res.data);
	console.log(chalk.green('Config fetched'));

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
			console.log(answers);
		});
});
