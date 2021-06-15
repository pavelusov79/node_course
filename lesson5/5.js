const http = require('http');
const fs = require('fs');
const path = require("path"); 
const inquirer = require("inquirer"); 


http.createServer((request, response) => {
	const currentDirectory = process.cwd();
	const file = path.join(currentDirectory, 'example.txt');
	const list = fs.readdirSync(currentDirectory);
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write(`<h3>текущая директория: ${currentDirectory}</h3>`)
	response.write('Выберите файл:<br>');
	list.forEach(elem => response.write(`<a style="color:black; text-decoration: none;" id="${elem}" href="#">${elem}</a>` + '<br>'));
	response.write('<br>')
	const readFile = fs.readFile(file, (e, data) => {
		if (e) throw e;
		response.end(`<p style="font-style:italic;">${data}</p>`);
	});
}).listen(3000, 'localhost');










