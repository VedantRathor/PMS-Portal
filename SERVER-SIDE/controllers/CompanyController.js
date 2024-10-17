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
const company = db.company;
const service = require('../services/service')
const jwt = require('jsonwebtoken')
const authIslogin = require('../middlewares/authIslogin');
const { SERIALIZABLE } = require('sequelize/lib/table-hints');
const { Socket } = require('socket.io');


const registerCompany = async (req, res) => {
    try {
        const {  company_name, company_registration_number, company_unique_id, admin_name, admin_email, password, ucpassword } = req.body;
        const emailExists = await userinfo.FindUser(admin_email);
        if (emailExists == null) {
            if (password == ucpassword) {
                
                // create user 
        
                let companyRegisNumberAlreadyExists = await company.findOne({where:{company_registration_number:company_registration_number}});
                let companyUniIdAlreadyExists = await company.findOne({where:{company_unique_id:company_unique_id}});
             
           
                if( companyRegisNumberAlreadyExists == undefined && companyUniIdAlreadyExists == undefined ){
                    const token = await service.generateToken(admin_email);
                    let result = await userinfo.createAdmin(req.body, token);
                    
                    if( result ){
                        const registeredCompanyResult = await company.create({
                            company_name : company_name,
                            company_registration_number : company_registration_number,
                            company_unique_id : company_unique_id,
                            admin_name : admin_name,
                            admin_email : admin_email,
                            updated_by : result.user_id,
                            admin_id : result.user_id
                        })
                        const CompanyId = await company.findOne({where:{admin_id:result.user_id}}) ;
                        await userinfo.update({
                            
                                created_by: result.user_id,
                                company_id : CompanyId.company_id
                          }
                            ,{
                                where : {
                                    user_id : result.user_id
                                }
                            }
                        )
                        result.company_id = CompanyId.company_id;
                        service.successRetrievalResponse(res,'company and admin is registered',result);
                        
                    }else{
                        service.failRetrievalResponse(res, 'Some error occured in creating user, please try again!')
                    }
                   
                   
                }else{
                    // create user, then company 
                     service.failRetrievalResponse(res, 'Company Already Exists')
                }
               
                
                // send full response to the client exluding email password 
               
            } else {
                service.failRetrievalResponse(res, 'user Password be registered')
            }
        } else {
            service.failRetrievalResponse(res, 'user already exists')
        }
    } catch (error) {
        console.log(error);
        service.serverSideError(res);
    }
}


module.exports = {
    registerCompany
}
