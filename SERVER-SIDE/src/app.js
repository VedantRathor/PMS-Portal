const express = require('express')
const app = new express()
const multer = require('multer');
const path = require('path');
const router = require('../routes/router')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))
app.use(router)

app.listen(7007,()=>{
    console.log('Listening OK at 7007')
})