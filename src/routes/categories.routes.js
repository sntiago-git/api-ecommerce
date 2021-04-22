const { Router } = require("express");
const router = Router();

const { checkToken, isAdmin, validarCampos } = require("../middlewares")
const { check } = require("express-validator");

const {
    getCategories, addCategory, updateCategory, removeCategory
} = require("../controllers/Product/category.controller")


router.get("/", getCategories)

router.post("/", [
    checkToken,
    isAdmin,
    check("name", "name is required").not().isEmpty(),
    validarCampos
], addCategory);

router.put("/:id", [
    checkToken,
    isAdmin,
    check("name", "name is required").not().isEmpty(),
    validarCampos
], updateCategory);

router.delete("/:id", [checkToken, isAdmin], removeCategory);


module.exports = router;