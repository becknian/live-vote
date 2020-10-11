var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

let votes = {'v1': 0, 'v2': 0, 'v3': 0, 'v4': 0};

io.on('connection', function(socket){
  io.emit('init', votes);
  
  socket.on('vote', function(msg){
    votes['v' + msg.option] += 1;
    votes.option = msg.option;
    io.emit('vote', votes);
  });
  socket.on('refresh', function(){
    votes = {'v1': 0, 'v2': 0, 'v3': 0, 'v4': 0};
    io.emit('refresh');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
