const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    id: String,
    member: String,
    memberUsername: String,
    lastMessage: Date,
    author: String,
})
module.exports = mongoose.model("chat", Schema)