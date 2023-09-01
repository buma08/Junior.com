const express = require("express")
const { verificarToken } = require("../functions")
const Router = express.Router()
const userModel = require("../models/user")

Router.post("/tokenAuth", (req,res,next)=>{
    verificarToken(req,res,next)
})
Router.use("/chat", require("./info/chat"))
Router.post("/getUser", (req,res)=>{
    if(!req.body.id){
        return res.json({status:402, message:"Invalid params"})
    }
        userModel.findOne({id: req.body.id}).then(dbRes=>{

         if(!dbRes){
         return res.json({status:404, message:"User doesnt exist"})
         }
        return res.json(dbRes.username)
        })
    })
module.exports = Router