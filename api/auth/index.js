const jwt = require('jsonwebtoken')
const User = require('../models/Users')

const isAuthenticated  = (req, res, next) =>{
    const token = req.headers.authorization
    if(!token){
        return res.sendStatus(403)
    }
    jwt.verify(token, 'mi-secreto',(err, decoded)=>{
        User.findOne({id}).exec()
            .then(user => {
                req.user = user
                next()
            })
    })
}
const hasRoles = roles => (req, res, next)=>{
    if(roles.indexOf(req.user.role) > -1){
        return next()
    }
    res.sendStatus(403)
}

module.exports={
    isAuthenticated,
    hasRoles
}