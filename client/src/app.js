import SocketIO from 'socket.io-client';
import SocketIOFileClient from 'socket.io-file-client';

var socket = SocketIO('http://localhost:3000');

socket.on('error', (err) => {
	console.log(err);
});

// set event handlers
socket.on('connect', () => {
	console.log('connection established!');
});

// unset event handlers
socket.on('disconnect', () => {
	console.log('disconnect connection');
});

var socketIOFile = new SocketIOFileClient(socket);

socketIOFile.on('start', function() {
	console.log('File uploading staring...');
});

socketIOFile.on('stream', function(data) {
	console.log('SocketIOFileClient: Client streaming... ' + data.uploaded + ' / ' + data.size);
});

socketIOFile.on('complete', function() {
	console.log('File Uploaded Successfully!');
});

document.getElementById('UploadButton').addEventListener('click', function() {
	var file = document.getElementById('FileBox').files[0];
	socketIOFile.upload(file);
});