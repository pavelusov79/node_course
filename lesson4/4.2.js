#!/usr/bin/env node

const fs = require('fs');
const path = require("path"); 
const inquirer = require("inquirer"); 


const currentDirectory = process.cwd();

inquirer 
.prompt([{
		name: "path", 
		type: "input", 
		message: "Введите путь до директории где расположен  лог файл: ", 
	}]) 
.then((answerPath) => { 

	const list = fs.readdirSync(answerPath.path);

	console.log('path = ' + answerPath.path);

	inquirer 
		.prompt([
			{ 
				name: "fileName", 
				type: "list", 
				message: "Выберите файл: ", 
				choices: list, 
			},
		]) 
		.then((answer) => {

			console.log('fileName = ' + answer.fileName);

			const filePath = path.join(answerPath.path, answer.fileName); 

			console.log('filePath= ' + filePath);

			inquirer
				.prompt([{
					name: "ip", 
					type: "input", 
					message: "Введите ip адрес: ",
				}])
				.then((answer) => {

					console.log('ipname = ' + answer.ip); 

					const readStream = fs.createReadStream(filePath, 'utf-8');

					const writeStream = fs.createWriteStream(currentDirectory + '/' + answer.ip + '_requests.log', {flag: 'a', encoding: 'utf-8'});

					readStream.on('data', (chunk) => {

						let string = chunk.split('\n'); 

						for(let i = 0; i <= string.length; i++) {
							if (string[i] !== ' ' && string[i] !== undefined) {
								let substr = string[i].split(' ');
								if (substr[0] === answer.ip) {
									writeStream.write(string[i].toString());
									writeStream.write('\n');
								}
							}
							if (i == 30) break;
						}

					});

					readStream.on('end', () => {
						console.log('file writing finished')
						process.exit(0);
					});

				});

		});

});







