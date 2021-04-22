categoryCtrl = {};

const { Category } = require("../../models");


categoryCtrl.getCategories = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query

    try {
        const [total, listCategories] = await Promise.all([
            Category.countDocuments(),
            Category.find()
                .skip(desde)
                .limit(limite)
        ])

        if (total > 0) res.status(200).json({ total, listCategories })
        else res.status(404).send("no categories found")


    } catch (error) {
        res.status(400).json(error);
    }
};


categoryCtrl.addCategory = async (req, res) => {

    try {
        const name = req.body.name.toUpperCase().trim();
        console.log(name)

        /* Verificar existencia de categoria,
        Si la categoria ha sido deshabilitada (remove) se puede crear una nueva con el mismo nombre.*/

        const categoryFound = await Category.findOne({ "name": name, "status": true });
        if (categoryFound) return res.status(400).send({ success: false, message: "Category already exists" });

        const newCategory = new Category({
            name
        });

        await newCategory.save();

        res.status(201).json({ "New Category added: ": newCategory });
        console.log("nueva categoria creada:", newCategory);

    } catch (error) {
        res.json(error)
    }
};


categoryCtrl.updateCategory = async (req, res) => {

    try {
        //Buscar por id params
        const category = await Category.findById(req.params.id)
        if (!category) return res.res.status(404).json("Category id not found");

        const newName = req.body.name.toUpperCase().trim();

        const categoryFound = await Category.findOne({ name: newName, status: true });
        if (categoryFound) return res.status(400).send({ success: false, message: "Category already exists, use another name" });

        var updateCategory = await Category.findByIdAndUpdate(req.params.id, { "name": newName }, {
            new: true
        });

        res.status(200).json({ "Category updated:": updateCategory });
        console.log("Categoria actualizada:", updateCategory);



    } catch (error) {
        res.status(400).json(error)
    }
};


categoryCtrl.removeCategory = async (req, res) => {

    try {
        var category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json("Category id not found");

        if (category.status === false) {

            return res.status(400).json({ success: false, message: "The category was previously removed" });

        } else {

            const removedCategory = await Category.findByIdAndUpdate(req.params.id, { "status": false }, {
                new: true
            })

            return res.status(200).json({ "The following category was removed:": removedCategory });
        };

    } catch (error) {
        res.status(400).json(error);
    }
};



module.exports = categoryCtrl;






