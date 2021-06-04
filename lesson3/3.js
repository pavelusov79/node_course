const fs = require('fs');

function SearchIpFromLog(ip) {
	const readStream = fs.createReadStream('./access.log', 'utf-8');
	const writeStream = fs.createWriteStream('./'+ip+'_requests.log', {flag: 'a', encoding: 'utf-8'});
	readStream.on('data', (chunk) => {
	let string = chunk.split('\n'); 
	console.log('string= ' + string)
	for(let i = 0; i <= string.length; i++) {
		if (string[i] !== ' ' && string[i] !== undefined) {
			let substr = string[i].split(' ');
			if (substr[0] === ip) {
				// console.log(string[i]);
				writeStream.write(string[i].toString());
				writeStream.write('\n');
			}
		}
	}
	});
	readStream.on('end', () => console.log('file reading finished'));
};

// SearchIpFromLog('89.123.1.41');
SearchIpFromLog('34.48.240.111');

