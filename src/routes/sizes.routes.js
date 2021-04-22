const { Router } = require("express");
const router = Router();
const { checkToken, isAdmin } = require("../middlewares")

const { getSizes, addSize } = require("../controllers/Product/size.controller");

router.get("/", getSizes)
router.post("/", addSize);


module.exports = router;