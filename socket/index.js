const { socketPort } = require('../lib/helper/getIpAndPort')
const { Server } = require('socket.io')
const httpProxy = require('http-proxy')

const io = new Server(socketPort, { cors: true, transport: ['websocket'] })

let so = null

const { MongoDB } = require('../db/index')
const { MessageSchema } = require('../lib/models/Message')
const messageModel = MessageSchema.getInstance().instance

httpProxy
  .createProxyServer({
    target: `http://localhost:${socketPort}`,
    ws: true,
  })
  .listen(80)

io.on('connection', socket => {
  so = socket
  console.log('user connected')

  socket.on('sendMsg', async data => {
    const _data = JSON.parse(data)
    const { type } = _data
    if (type === 'chat') {
      try {
        await MongoDB.connect()
        await messageModel.create(_data)

      } catch (error) {
        console.log(error)
      } finally {
        MongoDB.disconnect()
      }
    }
    io.sockets.emit('broadcast', data)
    console.log(`收到客户端的消息：${data}`)
  })

  socket.on('disconnect', reason => {
    console.log('user disconnect', reason)
  })
})

module.exports = { httpProxy, so, io }
