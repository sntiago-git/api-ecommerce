const { Router } = require("express");
const router = Router();

const { checkUser, validarCampos } = require("../middlewares")
const { check } = require("express-validator")

const {
    signUp, signIn
} = require("../controllers/auth.controller");


router.post("/signIn", signIn)
router.post("/signUp", [
    checkUser,
    check("name", "name is required").not().isEmpty(),
    check("email", "Does not appear to be a valid email address").isEmail().normalizeEmail(),
    validarCampos
], signUp);


module.exports = router;