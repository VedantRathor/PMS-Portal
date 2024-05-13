const { Model, QueryTypes, where } = require('sequelize')
const express = require('express');
const db = require('../models/index')
const { Op } = require('sequelize')
const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.task
const log = db.log
const service = require('../services/service')
const jwt = require('jsonwebtoken')
const authIslogin = require('../middlewares/authIslogin');
const { SERIALIZABLE } = require('sequelize/lib/table-hints');


// This Method: Registers the user
const adduser = async (req, res) => {
    try {
        const { email, password, ucpassword } = req.body

        // FindUser - finds the user if having email already
        const emailExists = await userinfo.FindUser(email)
        if (emailExists == null) {
            if (password === ucpassword) {
                const token = service.generateToken(email)
                // create user 
                const result = await userinfo.createUser(req.body, token)
                // send full response to the client exluding email password 
                service.successRetrievalResponse(res, 'user registered', result)
            } else {
                service.failRetrievalResponse(res, 'user cannot be registered')
            }
        } else {
            service.failRetrievalResponse(res, 'user already exists')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// This Method: Used for authentication and Login.
const loginUserByEmailPass = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailExists = await userinfo.FindUser(email)

        if (emailExists != null) {
            // check for password ! 
            if (password == emailExists.password) {
                // generate token 
                const token = service.generateToken(email)
                // update it 
                await userinfo.updateUser(token, emailExists.email)
                let result = emailExists
                service.successRetrievalResponse(res, 'login succesful', result)

            } else {
                service.failRetrievalResponse(res, 'passwords not matched')
            }
        } else {
            service.failRetrievalResponse(res, 'email doesnot exists')
        }

    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

async function UpdateDetails(req, res) {

    const { name, email, password, confirmpassword, id } = req.body;
    const profile = req.file ? req.file.path : "No File";
    console.log(profile);
    const response = await userinfo.update({ name: name, email: email, password: password, updated_at: new Date(), profile: profile }, { where: { user_id: id } });

    if (response) {
        res.status(200).json({ status: "success", message: "Profile Updated", response })
    }
    else {
        console.log("Error in Updating User Data");
    }
}

module.exports = {
    adduser,
    loginUserByEmailPass,
    UpdateDetails
}