productCtrl = {};

const { Product, Category } = require("../../models");


productCtrl.getProducts = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query

    try {
        const [total, listProducts] = await Promise.all([
            Product.countDocuments(),
            Product.find()
                .skip(desde)
                .limit(limite)
        ])

        if (total > 0) res.status(200).json({ total, listProducts })
        else res.status(404).send("no products found")


    } catch (error) {
        res.status(400).json(error);
    }
};


productCtrl.getProduct = async (req, res) => {

    try {
        const id = req.params.id

        const subproducto = "605a6476a413da04f82817c9"


        const [product, subproducts] = await Promise.all([
            Product.findById(id),
            Subproduct.findById(subproducto)
        ])







        res.json({ product, subproducts })

    } catch (error) {
        res.status(400).json(error);
    }
};



productCtrl.getProductsByCategory = async (req, res) => {

    const category = req.params.category.toUpperCase().trim();
    const { desde = 0, limite = 5 } = req.query

    const categoryFound = await Category.findOne({ "name": category });

    if (!categoryFound) return res.status(404).json({ success: false, message: "Category does not exists" });

    const query = {
        "category": categoryFound._id
    }

    const [total, listProducts] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(desde)
            .limit(limite)
    ])

    if (total > 0) res.status(200).json({ total, listProducts })
    else res.status(404).send("no products found in this category")
}




productCtrl.addProduct = async (req, res) => {

    try {
        const {
            sku,
            tittle,
            description,
            category, //id
            color, //id
            size, //id
            price, //id
            tags, 
            quantity 

        } = req.body;

        if (await Product.findOne({ "sku": sku })) return res.json({ success: false, message: "Product already exists, Sku is in use"});

        var errors = []
      
        const newProduct = new Product({
            sku,
            tittle,
            description,
            category, //id
            color, //id
            size, //id
            price, //id
            tags, 
            quantity 
        })

        await newProduct.save();
        res.json({ "nuevo producto creado: ": newProduct });
        console.log("nuevo producto creado:", newProduct);

    } catch (error) {
        res.status(400).json(error);
    }
};


productCtrl.updateProduct = async (req, res) => {

    try {
        await Product.findById(req.params.id);
        var updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json(updateProduct);
        console.log("Producto actualizado:", updateProduct);

    } catch (error) {
        res.status(400).json(error)
    }
};




productCtrl.deleteProduct = async (req, res) => {

    try {
        var product = await Product.findById(req.params.id);

        if (product) {
            await product.delete();
            res.status(204).json();
            console.log("producto eliminado: ", product);

        } else {
            res.status(404).json("product not found");
        }

    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = productCtrl;






