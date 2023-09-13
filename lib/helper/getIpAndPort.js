const fs = require('fs')

const fileDataJson = fs.readFileSync('../../ipAddress.json', 'utf-8')

const fileData = JSON.parse(fileDataJson)


const { ip, port } = fileData

module.exports = {
  ip,
  port
}
