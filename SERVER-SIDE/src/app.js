require('dotenv').config();

const express = require('express');
const socket = require('./socket');
const app = new express();
const http = require('http') ; 
const server = http.createServer(app); 
const io  = socket.init(server); 
const db = require('../models/index')
const multer = require('multer');
const path = require('path');
const router = require('../routes/router')
const bodyParser = require('body-parser')
const cors = require('cors')

// const { Server } = require('socket.io')

const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.tasks   
const log = db.log
const notification = db.notification

// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     }
// })
// Initialize Socket.IO with the server



app.use(cors({
    origin: 'http://localhost:5173', // Adjust to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))

app.use("/uploaded-image", express.static(path.join(__dirname, "../storage/uploads")));
;
app.use(router);




server.listen(7007, () => {
    console.log('Listening OK at 7007')
})