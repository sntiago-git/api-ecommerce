const { Router } = require("express");
const router = Router();
const { checkToken, isAdmin } = require("../middlewares")

const {
    getOrders, getOrder, addOrder
} = require("../controllers/order.controller")

router.get("/", [checkToken, isAdmin], getOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);


module.exports = router;