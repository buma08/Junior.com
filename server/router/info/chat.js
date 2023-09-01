const express = require("express");

const messageModel = require("../../models/message");
const chatModel = require("../../models/chat");
const Router = express.Router();

Router.get("/get", async (req, res) => {
  const userId = req.query.id;

  if (!userId) {
    return res.json({ status: 403, message: "Invalid user id" });
  }

  try {
    const chats = await chatModel.find({
      $or: [{ author: userId }, { member: userId }],
    });

    const finalChats = [];

    for (const c of chats) {
      let hasUnread = false;

      const msgs = await messageModel.find({ chat: c.id, author:{$ne: userId} });

      msgs.forEach((msg) => {
        
        if (!msg.read) {
          hasUnread = true;
        }
      });

      const obj = {
        id: c.id,
        member: c.member,
        memberUsername: c.memberUsername,
        lastMessage: c.lastMessage,
        author: c.author,
        hasUnread,
      };

     
      finalChats.push(obj);
    }

   
    res.json({ status: 200, message: "Successful", data: finalChats });
  } catch (error) {
    console.error("Error al buscar chats:", error);
    res.json({ status: 0, message: "Uncommon error", error });
  }
});

Router.use("/messages", require("./messages"));
module.exports = Router;
