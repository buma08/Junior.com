const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    id: String,
    author: String,
    content: String,
    time: Date,
    chat: String,
    read: Boolean,
})
module.exports = mongoose.model("message", Schema)