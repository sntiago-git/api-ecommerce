const { Router } = require("express");
const router = Router();

const { checkToken, isAdmin, validarCampos } = require("../middlewares")
const { check } = require("express-validator")

const {
    getAllProducts,
    getProductsByFilters,
    getProduct,
    addProduct,
    updateProduct,
    removeProduct

} = require("../controllers/product/product.controller");


//Consultas
router.get("/", getProductsByFilters); //Lista de productos activos segun filtros.
router.get("/item/:id", getProduct); //Producto en detalle
router.get("/all/", getAllProducts); //Todos los productos activos.


router.post("/", [
    checkToken,
    isAdmin,
    check("sku", "sku is required").not().isEmpty(),
    check("tittle", "tittle is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    check("color", "color is required").not().isEmpty(),
    check("size", "size is required").not().isEmpty(),
    check("price", "price is required").not().isEmpty(),
    validarCampos

], addProduct);

router.put("/:id", [checkToken, isAdmin], updateProduct);

router.delete("/:id", [checkToken, isAdmin], removeProduct);


module.exports = router;
