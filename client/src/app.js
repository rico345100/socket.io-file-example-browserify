import SocketIO from 'socket.io-client';
import SocketIOFileClient from 'socket.io-file-client';

var socket = SocketIO('http://localhost:3000');
var uploader = new SocketIOFileClient(socket);
var form = document.getElementById('form');

uploader.on('ready', function() {
	console.log('SocketIOFile ready to go!');
});
uploader.on('loadstart', function() {
	console.log('Loading file to browser before sending...');
});
uploader.on('progress', function(progress) {
	console.log('Loaded ' + progress.loaded + ' / ' + progress.total);
});
uploader.on('start', (fileInfo) => {
	console.log('Start uploading', fileInfo);
});
uploader.on('stream', (fileInfo) => {
	console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
});
uploader.on('complete', (fileInfo) => {
	console.log('Upload Complete', fileInfo);
});
uploader.on('error', (err) => {
	console.log('Error!', err);
});
uploader.on('abort', (fileInfo) => {
	console.log('Aborted: ', fileInfo);
});

form.onsubmit = function(ev) {
	ev.preventDefault();
	
	var fileEl = document.getElementById('file');
	var uploadIds = uploader.upload(fileEl);
};