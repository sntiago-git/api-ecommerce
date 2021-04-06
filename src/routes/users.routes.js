const { Router } = require("express");
const router = Router();

const { checkToken, checkUser, isAdmin, validarCampos } = require("../middlewares");
const { check } = require("express-validator")

const {
    createUser, getUsers
} = require("../controllers/user.controller")

router.post("/", [
    checkToken,
    isAdmin,
    checkUser,
    check("name", "name is required").not().isEmpty(),
    check("email", "Does not appear to be a valid email address").isEmail().normalizeEmail(),
    check("roles", "Role does not exists").isIn(["user", "moderator", "admin"]),
    validarCampos
], createUser);

router.get("/", [checkToken, isAdmin], getUsers);



module.exports = router;