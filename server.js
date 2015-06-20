//require express
var express = require('express');
//require path
var path = require('path');
//initialize app
var app = express();

//setting up directories
app.use(express.static(path.join(__dirname, './static')));

//setting up view files
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//root rendering rout
app.get('/', function(req,res){
	res.render('index');
})

//listen on port 8000
var server = app.listen(8000, function(){
	console.log('Server is listening on port 8000');
})
//setup socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
	console.log('heres where our sockets start');

	socket.on('posting_form',function(data){
		socket.emit('updated_message', data);
	})
})

