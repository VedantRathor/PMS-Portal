const { Model } = require('sequelize')
const db = require('../models/index')
const userinfo = db.userinfo 
const project = db.project 
const assignment = db.assignment 
const task = db.task 
const log = db.log 
const jwt = require('jsonwebtoken')


// This Method: returns a succesful response, including result.
const successRetrievalResponse = (res,msg,result='') =>{
    return res.json({
        status : 'success',
        msg : msg,
        result : result 
    }) 
}

// This Method: returns a failure response.
const failRetrievalResponse = (res,msg) =>{
    return res.json({
        status : 'unsuccess',
        msg : msg 
    })
}

// This Method: returns a server-side failure response.
const serverSideError = (res) =>{
    return res.json(
        {
            status : 'unsuccess',
            msg : 'Server-side Error. Try again later.'
        }
    )
}

// This Method: Generates and returns the Token
const generateToken = (email) =>{
    console.log(process.env.SECRETKEY)
    return (jwt.sign({email: email},'mynameisvedantrathoreeeSingh',{expiresIn: '48h'}))
}

module.exports = {
   
    successRetrievalResponse,
    serverSideError,
    generateToken,
    failRetrievalResponse
}