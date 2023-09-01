const express = require("express")
const { makeRandomChatId } = require("../../functions")
const chatModel = require("../../models/chat")
const userModel = require("../../models/user")
const messageModel = require("../../models/message")
const Router = express.Router()

Router.use("/messages", require("./messages"))
Router.post("/create", async (req,res)=>{
    
    const body = req.body
    const member = body.member
    const author = body.author
    
    const chatId = await makeRandomChatId(25)

    chatModel.findOne({member, author}).then(dbRes=>{
        if(dbRes){
            return res.json({status: 201, message: "Existing chat"})
        }
        userModel.findOne({id:member}).then(r=>{
            console.log(r)
            chatModel.create({id:chatId, member:member, memberUsername:r.username, lastMessage: null, author}).then(dbRes=>{
            res.json({status:200, message: "Succefull"})
        })
        })
        
        .catch(error=>{
            res.json({status:0, message:"An error has ocurred", error})
            console.log(error)
        })
        
    })


})
Router.delete("/delete", (req,res)=>{
    const body = req.body
    const chat = body.chat
    if(!chat){
        return res.json({status: 402, message: "Missing parameters"})
    }
    chatModel.findOne({id:chat}).then(dbRes=>{
        if(!dbRes){
           return res.json({status:404, message: "This chat is not at the database"})
        }
        chatModel.deleteOne({id: chat}).then(dbRes=>{
            messageModel.deleteMany({chat}).then(()=>{
                res.json({status:200, message: "Succefull"})
            })
            
        })
        .catch(error=>{
            res.json({status:0, message:"An error has ocurred", error})
        })
    })
})

module.exports = Router