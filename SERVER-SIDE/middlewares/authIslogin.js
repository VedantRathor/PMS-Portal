  const jwt = require('jsonwebtoken')
const db = require('../models/index')
const userinfo = db.userinfo 

const authIslogin = async(req,res,next) => {
  try {
    const token = req.get('Authorization').split(' ')[1]
    let response = await jwt.verify(token,'mynameisvedantrathore');
    if( response != null ){
       let result = await userinfo.findOne({where:{email:response.email}})
       res.locals.user = result.toJSON()
    }else{
      res.json({
        status : 'unsuccess',
        msg : 'token not found'
      })
    }
   
    next()
  } catch (error) {
    res.json({
        status : 'unsuccess',
        msg : 'token not found'
      })
      next()
  }
}
module.exports= authIslogin