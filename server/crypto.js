const CryptoJS = require("crypto-js");
const path = require("path")
require("dotenv").config(path.resolve(__dirname, "./.env"))

const key = process.env.crypto_key

module.exports = {
  encrypt: (mensaje) => {
        if(!mensaje){
        return console.error("Has de mandar un mensaje para cifrar")
    }
    const crypted = CryptoJS.AES.encrypt(mensaje, key).toString()
    return crypted
  },
  decrypt : (mensaje)=>{
    if(!mensaje){
        return console.error("Has de mandar un mensaje cifrado")
    }
    try {
        const bytes = CryptoJS.AES.decrypt(mensaje, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
      } catch (error) {
        console.error("Error al descifrar:", error);
        return null;
      }
  }
};
