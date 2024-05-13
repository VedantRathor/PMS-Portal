require('dotenv').config();
const db = require('../models/index')
const express = require('express')
const app = new express()
const multer = require('multer');
const path = require('path');
const router = require('../routes/router')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.task
const log = db.log
const notification = db.notification
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})
// Initialize Socket.IO with the server

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
const users = new Map();

io.on('connection', (socket) => {

    socket.on('new-user-connected', (user_data) => {
        users.set(user_data.user_id, socket);
        console.log('connected',user_data.user_id)
    })
    socket.on('disconnect', () => {
        users.forEach((value, key) => {
            if (value == socket) {
                users.delete(key)
                console.log('disconnected',)
            }
        })
    })
})
app.use((req, res, next) => {
    req.users = users;
    next();
  });
app.use(router)




server.listen(7007, () => {
    console.log('Listening OK at 7007')
})