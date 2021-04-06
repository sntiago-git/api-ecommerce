const { Router } = require("express");
const router = Router();
const { checkToken, isAdmin } = require("../middlewares")

const {
    getProducts,
    addProduct,
    getProduct,
    getProductsByCategory,
    updateProduct,
    deleteProduct
} = require("../controllers/product/product.controller");

router.post("/", [checkToken, isAdmin], addProduct);

router.get("/", getProducts);
router.get("/:category", getProductsByCategory);


router.get("/product/:id", getProduct);

router.put("/:id", [checkToken, isAdmin], updateProduct);
router.delete("/:id", [checkToken, isAdmin], deleteProduct);


module.exports = router;

//AGREGAR VALIDACIONES DE EXPRESS VALIDATOR