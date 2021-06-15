const io = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');
const randomname = require("randomstring");

const app = http.createServer((request, response) => {
  	if (request.method === 'GET') {
		
    	const filePath = path.join(__dirname, 'index.html');

    	readStream = fs.createReadStream(filePath);

    	readStream.pipe(response);
  	} else if (request.method === 'POST') {
	    let data = '';

	    request.on('data', chunk => {
			data += chunk;
	    });

	    request.on('end', () => {
      		const parsedData = JSON.parse(data);
      		console.log(parsedData);

      		response.writeHead(200, { 'Content-Type': 'json'});
      		response.end(data);
	    });
  	} else {
    	response.statusCode = 405;
      	response.end();
  	}
});

const socket = io(app);


socket.on('connection', function (socket) {
	const user = randomname.generate(7);
	socket.broadcast.emit('client_on', {msg: `User '${user}' is connected to broadcast chat`});
	
	socket.broadcast.emit('disconnect_client', {msg: `User '${user}' is closed the broadcast chat`});

	socket.on('CLIENT_MSG', (data) => {
  	socket.broadcast.emit('SERVER_MSG', { msg: data.msg});
  });
});

app.listen(3000, '127.0.0.1', () => {
	console.log('local server is running at 127.0.0.1:3000');
}); 
