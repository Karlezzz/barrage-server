const useSocket = () => {

  const { Server } = require('socket.io')

  const io = new Server(3001, { cors: true, transport: ['websocket'] })

  const httpProxy = require("http-proxy");

  httpProxy.createProxyServer({
    target: "http://localhost:3001",
    ws: true,
  }).listen(80)

  io.on('connection', socket => {
    console.log('user connected')

    socket.on('sendMsg', data => {
      io.sockets.emit('broadcast', data)
      console.log(`收到客户端的消息：${data}`)
    })

    socket.on('disconnect', reason => {
      console.log('user disconnect', reason)
    })
  })
}

module.exports = useSocket
