const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String,
    type:Number,
    avatar: String,

})
module.exports = mongoose.model("user", Schema)