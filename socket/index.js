const { port } = require('../lib/helper/getIpAndPort')
const { Server } = require('socket.io')
const httpProxy = require('http-proxy')

const webSocketPort = Number(port) + 1
const io = new Server(webSocketPort, { cors: true, transport: ['websocket'] })

let so = null

httpProxy
	.createProxyServer({
		target: `http://localhost:${webSocketPort}`,
		ws: true,
	})
	.listen(80)

io.on('connection', socket => {
	so = socket
	console.log('user connected')

	socket.on('sendMsg', data => {
		io.sockets.emit('broadcast', data)
		console.log(`收到客户端的消息：${data}`)
	})

	socket.on('disconnect', reason => {
		console.log('user disconnect', reason)
	})
})

module.exports = { httpProxy, so, io }
