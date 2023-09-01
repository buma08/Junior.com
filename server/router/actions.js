const express = require("express")
const Router = express.Router()
const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const functions = require("../functions")
const jwt = require("jsonwebtoken")


Router.post("/log", async (req,res)=>{
    const body = req.body
    
    let email = body.email
    let password = body.password

    userModel.findOne({email:email}).then(async dbRes=>{
        if(!dbRes) return;
        else{
            const comparition = await bcrypt.compare(password, dbRes.password)
            if(comparition){
                
                const info = {
                    id:dbRes.id,
                    user: dbRes.username,
                    email: dbRes.email,
                    type: dbRes.type
                }
                const token = functions.generarToken(info, process.env.jwtSecret )
                res.json({status:200, message: "User authenticathed", token:token})
            }
            else{
                res.json({status:403, message: "Unhauthorized, wrong combination"})
            }
        }
    })

})

Router.post("/reg", async(req,res)=>{
   const body = req.body
   
   let id =await functions.makeRandomId(25)


   let user = body.username
   let email = body.email
   let password = body.password
    let type = body.type 
    const salts = 12
   userModel.findOne({email:email}).then(async dbRes=>{
    if(!dbRes){
        let hashedPassword = await bcrypt.hash(password, salts)
       return userModel.create({id:id, username:user, email:email, password:hashedPassword, type:type}).then((dbRes2)=>{
            const info = {
                id:dbRes2.id,
                username: dbRes2.username,
                email: dbRes2.email,
                type: dbRes2.type
            }
            
            const token = functions.generarToken(info, process.env.jwtSecret )

            res.json({status: 200, message: "Acc created", token:token})
        })
    }
    return res.json({status:403, message: "Acc already exists"})
   })
})
Router.use("/chat", require("./actions/chat.js"))

module.exports = Router