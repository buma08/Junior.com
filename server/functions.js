const mongoose = require("mongoose")
const userModel = require("./models/user")
const chatModel = require("./models/chat")
const messageModel = require("./models/message")
const path = require("path")
const jwt = require("jsonwebtoken")
require("dotenv").config(path.resolve(__dirname, "./.env"))
module.exports = {
    makeRandomId: async (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
      
        while (true) {
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
      
          const dbRes = await userModel.findOne({ id: result });
          
      
          if (!dbRes) {
            return result;
          }
          else{
            console.log("Id existente, generando otro")
          }
      
          // Clear the result and try generating a new ID
          result = '';
        }
      },
      makeRandomChatId: async (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
      
        while (true) {
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
      
          const dbRes = await chatModel.findOne({ id: result });
          
      
          if (!dbRes) {
            return result;
          }
          else{
            console.log("Id existente, generando otro")
          }
      
          // Clear the result and try generating a new ID
          result = '';
        }
      },
      makeRandomMessageId: async (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
      
        while (true) {
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
      
          const dbRes = await messageModel.findOne({ id: result });
          
      
          if (!dbRes) {
            return result;
          }
          else{
            console.log("Id existente, generando otro")
          }
      
          // Clear the result and try generating a new ID
          result = '';
        }
      },


      generarToken: function(usuario, key) {
        const claveSecreta = key; // Debes guardar esta clave en un lugar seguro y no exponerla públicamente.
        const payload = {
          user: usuario, // Puedes incluir información adicional aquí, como el ID del usuario, roles, etc.
        };
      
        const opciones = {
          expiresIn: "3d", // Tiempo de expiración del token. Puedes establecer otros valores como '1d' (1 día), '30m' (30 minutos), etc.
        };
      
        return jwt.sign(payload, claveSecreta, opciones);
      },


      verificarToken : function(req, res, next) {
        const token = req.body.token;
        
        
        if (!token) {
          
          return res.json({ status:401, mensaje: 'Acceso no autorizado, se requiere iniciar sesión' });
        }
      
        jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
          if (err) {
            console.error(err)
            return res.json({status:403, mensaje: 'Token inválido o expirado, inicie sesión nuevamente' });
          }
      
          // El token es válido, puedes acceder a los datos del usuario decodificados en "decoded"
          res.json({status:200, user:decoded})
          next();
        });
      }

  
}