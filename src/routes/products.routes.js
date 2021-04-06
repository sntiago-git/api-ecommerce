const { Router } = require("express");
const router = Router();
const { checkToken, isAdmin } = require("../middlewares")

const {
    getProducts,
    addProduct,
    getProduct,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    addColor,
    getColors,
    addSize,
    getSizes
} = require("../controllers/product/product.controller");

router.post("/", [checkToken, isAdmin], addProduct);

router.get("/", getProducts);
router.get("/:category", getProductsByCategory);

//color, price, size
router.get("/create/color", getColors);
router.post("/create/color", addColor);

router.get("/create/size", getSizes);
router.post("/create/size", addSize);
//router.post("/price", addPrice);


router.get("/product/:id", getProduct);

router.put("/:id", [checkToken, isAdmin], updateProduct);
router.delete("/:id", [checkToken, isAdmin], deleteProduct);


module.exports = router;

//AGREGAR VALIDACIONES DE EXPRESS VALIDATOR