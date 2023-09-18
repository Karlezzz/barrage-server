const mongoose = require('mongoose')

const dbName = 'BarrageSystem'
const dbPath = 'localhost:27017'
const dbUrl = `mongodb://${dbPath}/${dbName}`

class MongoDB {
  static connect() {
    const m = mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
    mongoose.connection.once("open", () => {
      console.log(dbName + "数据库连接成功，端口27017");
    })
  
    mongoose.connection.once("error", () => {
      console.log(dbName + "数据库连接失败！");
    })

    mongoose.connection.once('disconnected', () => {
      console.log(dbName + '数据库断开连接');
    })

    return m
  }
  static disconnect() {
    mongoose.disconnect()
  }
}

module.exports = {
  MongoDB
}



