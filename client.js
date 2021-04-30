// import inquirer from 'inquirer';
import axios from 'axios';
import { Command } from 'commander/esm.mjs';
import chalk from 'chalk';
const program = new Command();

program
	.requiredOption('-i --ip <ip>', 'IP address of the portal server')
	.requiredOption('-p --port <port>', 'Port of the portal server')
	.parse();
const args = program.opts();

console.log(chalk.blue('Fetching config from server...'));
axios.get(`http://${args.ip}:${args.port}`).then((res) => {
	console.log(res.data);
	console.log(chalk.green('Config fetched'));
});

// inquirer
// 	.prompt([
// 		{
// 			name: 'faveReptile',
// 			message: 'What is your favorite reptile?',
// 			default: 'Alligators',
// 		},
// 		{
// 			name: 'faveColor',
// 			message: 'What is your favorite color?',
// 			default: '#008f68',
// 		},
// 	])
// 	.then((answers) => {
// 		ans = answers;
// 	});

/*
	Create the config
	-> Ask for the number of submit portals
	-> Ask for the id of each submit portals
	-> Ask for the port
	-> Ask for the destination directory
	-> Create the config file
*/

// const portals = [];
// const config = {};

// inquirer.prompt([
// 	{
// 		name: 'numberOfPortals',
// 		message: 'How many submit portals do you want to create?',
// 		type: Number,
// 	},
// 	{

// 	}
// ]);
