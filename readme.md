# Socket.io-file-client

Socket.io-file-client is module for uploading file via Socket.io.

## Examples

You can found full source code here: [Example Page](https://github.com/rico345100/socket.io-file-example)

### Client side

#### HTML
```html
<html>
<head>
	<meta charset="UTF-8">
	<title>Socket File Upload</title>
</head>
<body>
	<div id="UploadBox">
		<h2>File Uploader</h2>
		<span id="UploadArea">
			<label for="FileBox">Choose A File:</label>
			<input type="file" id="FileBox" />
			<br />

			<button type="button" id="UploadButton">Upload</button>
		</span>
	</div>

	<script src="/socket.io.js"></script>
	<script src="/socket.io-file-client.js"></script>
	<script src="/alter.js"></script>
</body>
</html>
```

#### JavaScript
```javascript
var socket = io('http://localhost:3000');

window.addEventListener('load', function() {
	var socketIOFile = new SocketIOFileClient(socket);

	socketIOFile.on('start', function() {
		console.log('File uploading staring...');
	});

	socketIOFile.on('stream', function(data) {
		//console.log('SocketIOFileClient: Client streaming... ' + (Math.round(data.percent * 100)/100) + '%');
		console.log('SocketIOFileClient: Client streaming... ' + data.uploaded + ' / ' + data.size);
	});

	socketIOFile.on('complete', function() {
		console.log('File Uploaded Successfully!');
	});

	document.getElementById('UploadButton').addEventListener('click', function() {
		var file = document.getElementById('FileBox').files[0];
		socketIOFile.upload(file);
	});
});
```

Socket.io-file-client also supports UMD, so you can use ES2016 modular syntax with browserify.
```javascript
import SocketIO from 'socket.io-client';
import SocketIOFileClient from 'socket.io-file-client';

var socket = SocketIO('http://localhost:3000');
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
```


## API
### constructor SocketIOFileClient(socket)

Create new SocketIOFileClient object. This object automatically handles all file uploads from client via Socket.io.


### SocketIOFileClient.upload(file)
start uploading to server. After upload begins, these events will triggered:
* start: fires on start
* stream: fires on chunk of data sent. This event has argument for uploading information.
* complete: fires on complete

stream event has one argument which contains:
* Object stream: Internally, this module merge the data from client until file is all uploaded. This stream is part of file that client keep sending it.
* Number size: Total file size.
* Number uploaded: Amount of uploaded.
* Number percent: Percentage of how much uploaded

### SocketIOFileClient.on(String evName, Function fn)
Add event handler.

### SocketIOFileClient.off(String evName, Function fn)
Remove event handler.

### SocketIOFileClient.emit(String evName)
Emit specified event.



## Browser Supports
This module uses FileReader API, so latest browser is required.


Please check the Server side module too. Link: [socket.io-file](https://github.com/rico345100/socket.io-file)