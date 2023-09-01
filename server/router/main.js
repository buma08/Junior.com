const express = require("express")
const Router = express.Router()


Router.use("/actions", require("./actions.js"))
Router.use("/info", require("./info.js"))

module.exports = Router