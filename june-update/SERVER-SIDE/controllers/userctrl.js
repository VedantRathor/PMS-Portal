const { Model, QueryTypes, where } = require('sequelize')
const express = require('express');
const db = require('../models/index')
const { Op } = require('sequelize')
const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.task
const log = db.log
const notification = db.notification
const service = require('../services/service')
const jwt = require('jsonwebtoken')
const authIslogin = require('../middlewares/authIslogin');
const { SERIALIZABLE } = require('sequelize/lib/table-hints');


// This Method: Registers the user
const adduser = async (req, res) => {
    try {
        const userdata = res.locals.user ;
        const { user_id } = userdata ;
        const {  email, password, ucpassword , name } = req.body
        console.log(req.body)
        // FindUser - finds the user if having email already
        const emailExists = await userinfo.FindUser(email);
        if (emailExists == null) {
            if (password == ucpassword) {
                const token = service.generateToken(email);
                // create user 
                const result = await userinfo.createUser(req.body, token);
                const allUsers = await userinfo.findAll({attributes:['user_id']}) ;
                // console.log(allUsers);
                allUsers.map(async(eachUser) =>{
                    await notification.create({
                        user_id : eachUser.user_id,
                        notification : `Welcoming ${name}😍. ${req.body.aboutUser}`,
                        read : 0
                    })
                })
                // send full response to the client exluding email password 
                service.successRetrievalResponse(res, 'user registered', result);
            } else {
                service.failRetrievalResponse(res, 'user Password be registered')
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
    const profile = req.file ? req.file.path : "No File";
    console.log(profile);
    res.json(profile);
    // const response = await userinfo.update({ name: name, email: email, password: password, updated_at: new Date(), profile: profile }, { where: { user_id: id } });

    // if (response) {
    //     res.status(200).json({ status: "success", message: "Profile Updated", response })
    // }
    // else {
    //     console.log("Error in Updating User Data");
    // }
}


const getNotifications = async(req,res) =>{
    try {
        const userdata = res.locals.user ;
        const {user_id , role , name } = userdata ;
        // console.log(user_id,role,name)
        const result = await notification.findAll({where : {
            user_id : user_id 
        },order:[['created_at','DESC']]})
       
        const {view} = req.params
        console.log(view)
        if( view == 'true' ){
            console.log('inside this',view)
          await notification.update({
               read : 1 
          },{
            where : {
              user_id : user_id 
            }
          })
        }
        
        service.successRetrievalResponse(res,'Notifcations retrieved succesfully',result) 
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

const getAllUsers = async(req,res) =>{
 try {
    const result = await userinfo.findAll({where:{role:{
        [Op.ne] : 1
    }},
    attributes:['name','email','created_at','updated_at','role']
   })
   
    service.successRetrievalResponse(res,"user data succesfully retrieved",result)
 } catch (error) {
    console.log('error in getAllusers',error)
    service.serverSideError(res)
 }
}

const updateUserInfo = async(req,res) => {
    try {
        const {name,role,current_password,new_password,email} = req.body ;
        if( role == 0 ){
            service.failRetrievalResponse(res,'Please Select Valid Role') ;
        }else{
            const result = await userinfo.findAll({where:{email:email}}) ;
            if( current_password != null && current_password != undefined ){
                // update name,role and password 
               
                if( result.length == 0 ){
                   service.failRetrievalResponse(res,'User Does not Exists') ;
                }else{
                    if( result[0].password == current_password ){
                        await userinfo.update({
                            name : name,
                            password : new_password,
                            role : role
                        },{
                            where : {
                                user_id : result[0].user_id 
                            }
                        })
                        service.successRetrievalResponse(res,'Updation Succesfull') ;
                    }else{
                        service.failRetrievalResponse(res,'Password is not correct!') ;
                    }
                }
            }else{
                // do normal update, only in role and name
                await userinfo.update({
                    name : name,
                    role : role
                },{
                    where : {
                        user_id : result[0].user_id 
                    }
                });
                service.successRetrievalResponse(res,'Updation Succesfull') ; 
            }
        }
    } catch (error) {
        console.log('error in updateUserInfo',error);
        service.serverSideError(res) ;
    }
}
module.exports = {
    adduser,
    loginUserByEmailPass,
    UpdateDetails,
    getNotifications,
    getAllUsers,
    updateUserInfo
}