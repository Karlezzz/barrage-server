const useSocket = () => {
  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http, { cors: true });

  app.get('/', function (req, res) {
    res.send('<h1>你好web秀</h1>');
  });


  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('hello', (data) => {
      console.log(`收到客户端的消息：${data}`);
    })
  });


  http.listen(3001, function () {
    console.log('listening on *:3001');
  });
}

module.exports = useSocket
