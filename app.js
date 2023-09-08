var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const cors = require('cors')

// const db = require('./db/index')
// const useSocket = require('./socket/index')
// db(() => {
// 	useSocket()
// })
const useSocket = require('./socket/index')
useSocket()

var indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const socketRouter = require('./routes/socket')
const roomRouter = require('./routes/room')
const clientRouter = require('./routes/client')
const classRoomRouter = require('./routes/classRoom')
const { default: mongoose } = require('mongoose')

var app = express()
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter);
app.use('/user', usersRouter)
app.use('/socket', socketRouter)
app.use('/room', roomRouter)
app.use('/client', clientRouter)
app.use('/classRoom', classRoomRouter)

app.use(express.static('./dist'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
