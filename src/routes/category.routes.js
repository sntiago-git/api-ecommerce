const { Router } = require("express");
const router = Router();
const { checkToken, isAdmin } = require("../middlewares")

const {
    getCategories, addCategory, updateCategory, deleteCategory
} = require("../controllers/category.controller")

router.get("/", getCategories)
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);


module.exports = router;