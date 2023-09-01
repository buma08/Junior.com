const path = require("path")

require("dotenv").config(path.resolve(__dirname, "./.env"))
const express = require("express")
const mongoose = require("mongoose")


const app = express()
const cors = require("cors")
const messageModel = require("./models/message")

const http = require('http');
const {Server} = require('socket.io');
const { encrypt } = require("./crypto")
const { makeRandomChatId } = require("./functions")

app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
// -------------MAIN ROUTER----------

app.use("/api", require("./router/main.js"))


let online = []
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});





console.log("Conectando a la DB")
mongoose.connect(process.env.mongo_uri).then(()=>{
     console.log("DB CONECTADA")
})



io.on("connection", (socket)=>{
   
    console.log("User connected")


    socket.on("message", async msg=>{
        
        const cryptedContent = encrypt(msg.content)
        const id = await makeRandomChatId(45)
        messageModel.create({id, author:msg.author, chat:msg.chat, time:msg.time, content:cryptedContent, read:false}).then(dbRes=>{
           
        let finalMsg = {id, author:msg.author, chat:msg.chat, time:msg.time, content:msg.content, read:false}
        io.emit("message", finalMsg)})

    })
 
    socket.on("disconnect", ()=>{
        console.log("disconnect")
    })
})































const PORT = process.env.PORT
httpServer.listen(PORT, ()=>{
    console.log("Escuchando en https://localhost:"+ PORT)
})
