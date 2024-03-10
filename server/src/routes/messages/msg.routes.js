const { httpPostAddMsg,
    httpPostGetMsg
} = require('./msg.controller');

const msgRoutes = require('express').Router();

msgRoutes.post('/addMsg', httpPostAddMsg)
msgRoutes.post('/getMsg', httpPostGetMsg)

module.exports = msgRoutes

