const { Router } = require("express");
const router = Router();
const { checkToken, isAdmin } = require("../middlewares")

const { getColors, addColor } = require("../controllers/Product/color.controller");

router.get("/", getColors)
router.post("/", addColor);


module.exports = router;