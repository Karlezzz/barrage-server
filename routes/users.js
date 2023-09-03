var express = require('express');
var router = express.Router();
const { User, Response } = require('../lib/models')

// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', (req, res, next) => {
  //get Room info and check password
  //find user from sql
  //set user or update user
  //return token, user
  const jwt = require('jsonwebtoken')
  const secret = "barrageDGUTSecret111"


  const { body } = req
  const { roomId, name, id, originToken, ipAddress, password } = body
  let token = ''

  jwt.verify(originToken, secret, (err, decode) => {
    if (err) {
      token = jwt.sign({
        name, id
      }, secret, {
        expiresIn: 60 * 60 * 2
      });
    } else {
      token = originToken
    }
  })

  const data = {
    name,
    roomId,
    id,
    token,
  }
  const response = Response.init({
    data: [data],
  })
  res.send(response)
})

router.put('/', (req, res, next) => {
  const { body } = req

  //update sql
  res.send({
    code: '200',
    message: 'ok',
    data: body
  })
})


module.exports = router;
