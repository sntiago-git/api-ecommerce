productCtrl = {};

const { Product, Category, Color, Size, Price } = require("../../models");

//Consultas

const query_populate_product = [
    { path: 'category', select: { _id: 0 } }
];


productCtrl.getProductsByFilters = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query

    const {
        category,
        tittle,
        color,
        size
    } = req.body

    //Buscamos las categorias, devuelve array de documentos encontrados.
    try {
        const categoriesFound = await Category.find({ "name": category });
        if (categoriesFound.length > 0) {
            var categoriesIds = categoriesFound.map(cat => cat._id)
        }

    } catch (error) {
        res.send(error)     
    }

    //Filters, (guardan el query de busqueda o {})
    const category_filter = category ? { category: { $in: categoriesIds } } : {};
    const tittle_filter = tittle ? { tittle } : {};
    const color_filter = color ? { color } : {};
    const size_filter = size ? { "size.name": { $in: size } } : {};

    const query = {
        status: true,
        ...tittle_filter,
        ...category_filter,
        ...color_filter,
        ...size_filter
    }

    try {
        const [total, listProducts] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate(query_populate_product)
                .skip(desde)
                .limit(limite)
        ])

        if (total > 0) res.status(200).json({ total, listProducts })
        else res.status(404).send("No products found")


    } catch (error) {
        res.status(400).json(error);
    }
}


productCtrl.getProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id)
            .populate(query_populate_product);

        if (!product) return res.status(404).json({ success: false, message: "Product id does not exists" });

        if (product.status === true) res.status(200).json(product)
        else res.status(404).json({ success: false, message: "Product unvaliable, was previously removed" });

    } catch (error) {
        res.status(400).json(error);
    }
};


productCtrl.getAllProducts = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query
    const query = { status: true }

    try {
        const [total, listProducts] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate(query_populate_product)
                .skip(desde)
                .limit(limite)
        ])

        if (total > 0) res.status(200).json({ total, listProducts })
        else res.status(404).send("No products found")


    } catch (error) {
        res.status(400).json(error);
    }
};


//Creates

productCtrl.addProduct = async (req, res) => {

    try {
        const sku = req.body.sku.toUpperCase().trim();
        if (await Product.findOne({ "sku": sku })) return res.json({ success: false, message: "Product already exists, Sku is in use" });

        var errors = [];

        const {
            tittle,
            description,
            color,
            size,
            price,
            tags,
            quantity,
        } = req.body;

        var category = req.body.category

        //La cantidad de las tallas no puede ser igual a 0
        for (let i = 0; i < size.length; i++) {

            const element = size[i];
            if (element.quantity === 0) errors.push({ success: false, message: `${element.name} size quantity cannot be 0` });
        }

        //Busca si el name corresponde a un registro existente
        const categoryExist = await Category.findOne({ "name": category.toUpperCase().trim(), status: true });

        if (!categoryExist) errors.push({ success: false, message: "Product category does not exist" }); //Se crea un error.
        else category = categoryExist._id //Se actualiza la variable con el id asociado al registro o documento encontrado.


        if (errors.length > 0) return res.json(errors); //En caso de haber errores los devuelve.

        const newProduct = new Product({
            sku,
            tittle,
            description,
            category, //id
            color,
            size,
            price,
            tags,
            quantity
        })

        await newProduct.save();
        res.status(200).json({ "New Product added: ": newProduct });
        console.log("nuevo producto creado:", newProduct);

    } catch (error) {
        res.status(400).json(error);
    }
};

// Update 

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



// Remove, Status => False

productCtrl.removeProduct = async (req, res) => {

    try {
        var product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json("Product id not found");

        if (product.status === false) {

            return res.status(400).json({ success: false, message: "The product was previously removed" });

        } else {

            const removedProduct = await Product.findByIdAndUpdate(req.params.id, { "status": false }, {
                new: true
            })

            return res.status(200).json({ "The following product was removed:": removedProduct });
        };

    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = productCtrl;






