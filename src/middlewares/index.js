
const checkUser = require("./checkUser");
const isAdmin = require("./isAdmin");
const checkToken = require("./checkToken");
const validarCampos = require("./validar-campos")


module.exports = {
    checkUser,
    checkToken,
    isAdmin,
    validarCampos
}