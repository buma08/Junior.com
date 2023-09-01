const express = require("express");
const Router = express.Router();
const messageModel = require("../../models/message");
const chatModel = require("../../models/chat");
const { encrypt, decrypt } = require("../../crypto");
const { makeRandomMessageId } = require("../../functions");

Router.post("/create", async (req, res) => {
  const body = req.body;
  const author = body.author;
  const content = body.content;
  const chat = body.chat;

  const cryptedContent = encrypt(content);
  if (!chat || !author) {
    return res.json({ status: 402, message: "Missing parameters at the body" });
  }
  const createdId = await makeRandomMessageId(45);
  const date = Date.now();
  messageModel
    .create({
      content: cryptedContent,
      author,
      id: createdId,
      chat: chat,
      time: date,
    })
    .then((dbRes) => {
      res.json({ status: 200, message: "Succefull" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ status: 0, message: "uncommon error", e });
    });
});
Router.delete("/delete", (req, res) => {
  const body = req.body;
  const message = body.message;

  if (!message) {
    return res.json({ status: 402, message: "Missing parameters" });
  }
  messageModel
    .deleteOne({ id: message })
    .then(() => {
      res.json({ status: 200, message: "Succefull" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ status: 0, message: "uncommon error", e });
    });
});
Router.post("/edit", (req, res) => {
  const newContent = req.body.newContent;
  const crypted = encrypt(newContent);
  const message = req.body.message;
  if (!message || !newContent) {
    return res.json({ status: 402, message: "Missing parameters" });
  }
  messageModel
    .findOneAndUpdate({ id: message }, { content: crypted })
    .then(() => {
      res.json({ status: 200, message: "Succefull" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ status: 0, message: "uncommon error", e });
    });
});
Router.get("/read", async (req, res) => {
  console.log("Marcando como leidos")
  const chatId = req.query.chat;
  const userId = req.query.user;

  if (!chatId || !userId) {
    return res.json({ status: 402, message: "Missing params" });
  }

  try {
    chatModel.findOne({ id: chatId }).then((chat) => {
      if (!chat) {
        return res.json({ status: 404, message: "Chat not found" });
      }

      
        console.log(userId, chatId)
      
        messageModel
          .updateMany(
            { chat: chatId, read: false, author: { $ne: userId } },
            { read: true }
          )
          .then((dbRes2) => {
            console.log(dbRes2)
            res.json({ status: 200, message: "Successful" });
          });
      
    });
  } catch (error) {
    console.error("Error while marking messages as read:", error);
    res.json({ status: 0, message: "An error occurred", error });
  }
});
module.exports = Router;
