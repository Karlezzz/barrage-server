const mongoose = require('mongoose')


const dbName = 'barrage'
const dbPath = 'localhost:27017'
const dbUrl = `mongodb://${dbPath}/${dbName}`

module.exports = (callback) => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  mongoose.connection.once("open", () => {
    console.log(dbName + "数据库连接成功，端口27017");
    callback()
  });
  // mongoose.connection.once("open", () => {
  //   
  // });
  
  mongoose.connection.once("error", () => {
    console.log(dbName + "数据库连接失败！");
  });
}



