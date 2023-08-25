const useSocket = () => {
  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http, { cors: true, transport:['websocket'] },);

  app.get('/', function (req, res) {
    res.send('<h1>你好web秀</h1>');
  });


  io.on('connection', (socket) => {
    console.log('user connected');


    socket.on('sendMsg', (data) => {
      io.sockets.emit('broadcast', data)
      console.log(`收到客户端的消息：${data}`);
    })
  });


  io.listen(3001, function () {
    console.log('listening on *:3001');
  });
}

module.exports = useSocket
