categoryCtrl = {};

const { Category } = require("../models");


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

        //Verificar existencia de categoria
        const categoryFound = await Category.findOne({ "name": name });
        if (categoryFound) return res.status(400).send({ success: false, message: "Category already exists" });

        console.log(categoryFound)

        const newCategory = new Category({
            name
        });

        await newCategory.save();

        res.status(201).json(newCategory);
        console.log("nueva categoria creada:", newCategory);


    } catch (error) {
        res.json(error)
    }
};


categoryCtrl.updateCategory = async (req, res) => {

    try {
        const category = Category.findById(req.params.id)

        if (category) {

            var updateCategory = await Category.Update(req.params.id, req.body, {
                new: true
            });
            res.status(200).json(updateCategory);
            console.log("Categoria actualizada:", updateCategory);

        } else {
            res.status(404).json("Category not found");
        }


    } catch (error) {
        res.status(400).json(error)
    }
};


categoryCtrl.deleteCategory = async (req, res) => {

    try {
        var category = await Category.findById(req.params.id);

        if (category) {
            await category.delete();
            res.status(204).json();
            console.log("Categoria eliminada: ", product);

        } else {
            res.status(404).json("Category not found");
        }

    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = categoryCtrl;






