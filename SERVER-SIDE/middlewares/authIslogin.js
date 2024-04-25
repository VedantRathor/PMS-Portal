  const jwt = require('jsonwebtoken')
const db = require('../models/index')
const userinfo = db.userinfo 

const authIslogin = async(req,res,next) => {
  try {
    const token = req.get('Authorization').split(' ')[1]
    console.log(token)
    console.log(process.env.SECRETKEY)
    let response =  jwt.verify(token,'mynameisvedantrathoreeeSingh');
    console.log('response',response)
    if( response != null ){
       let result =  await userinfo.findOne({where:{email:response.email}})
       res.locals.user = result
    }else{
      res.json({
        status : 'unsuccess',
        msg : 'token not found'
      })
    }
   
    next()
  } catch (error) {
    console.log('error',error)
    res.json({
        status : 'unsuccess',
        msg : 'server-error'
      })
      next()
  }
}
module.exports= authIslogin