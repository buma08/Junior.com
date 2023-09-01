const express = require("express");
const Router = express.Router();

const chatModel = require("../../models/chat");
const messageModel = require("../../models/message");
const { decrypt } = require("../../crypto");

Router.get("/get", (req, res) => {
  const chat = req.query.id;
  const userId = req.query.user

    
  
  if (chat=="null" || !userId || userId=="null") {
    return res.json({ status: 402, message: "Missing parameters" });
  }
  chatModel.findOne({ id: chat }).then((dbRes1) => {
    if (!dbRes1) return res.json({ status: 404, message: "Missing chat" });
    if(dbRes1.member != userId && dbRes1.author != userId) return res.json({ status: 404, message: "Missing chat" });
    messageModel.find({ chat }).then((dbRes) => {
        
      const messages = dbRes;
      let finalMessages = [];
      messages.forEach((msg) => { 
        let content = msg.content;
        let decrypted = decrypt(content);
        finalMessages.push({
          id: msg.id,
          author: msg.author,
          content: decrypted,
          time: msg.time,
          chat: msg.chat,
          read:msg.read,
        });
      });
      res.json({ status: 200, message: "Succefull", data: finalMessages });
    });

  });
});
Router.get("/getOne", (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.json({ status: 402, message: "Missing parameters" });
  }

  messageModel
    .findOne({ id })
    .then((dbRes) => {
      if (!dbRes) {
        res.json({ status: 404, message: "Message not found" });
      }
      const message = dbRes;
      
      let finalMessage = {
        author: message.author,
        id: message.id,
        time: message.time,
        chat: message.chat,
        read: message.read
      };
      const decrypted = decrypt(message.content);
      finalMessage.content = decrypted;
      res.json({ status: 200, message: "Succefull", data: finalMessage });
    })
    .catch((e) => {
      console.log(e);
      res.json({ status: 0, message: "Uncommon error", e });
    });
});
module.exports = Router;
