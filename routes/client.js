const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()
const { ip } = require('../lib/helper/getIpAndPort')

router.get('/', (req, res, next) => {
  const ipAddress = ip
  // const ipAddress = getIpAddress()
  const response = Response.init({
    data: [ipAddress]
  })
  res.send(response)
})

// const os = require('os');
// function getIpAddress() {
//   const ifaces = os.networkInterfaces()
//   const iface = ifaces['以太网 2']
//   for (let i = 0; i < iface.length; i++) {
//     let { family, address, internal } = iface[i]
//     if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
//       return address
//     }
//   }

// }

module.exports = router
