const fs = require('fs')
const path = require('path')

const fileUrl = path.resolve(__dirname, '../../ipAddress.json')

const fileDataJson = fs.readFileSync(fileUrl, 'utf-8')

const fileData = JSON.parse(fileDataJson)

const { ip, port } = fileData

module.exports = {
  ip,
  port
}
