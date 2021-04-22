sizeCtrl = {};

const { Size } = require("../../models");


sizeCtrl.addSize = async (req, res) => {
    try {
        const name = req.body.name.toUpperCase().trim();
        console.log(name)

        //Verificar existencia del size

        const sizeFound = await Size.findOne({ "name": name });
        if (sizeFound) return res.status(400).send({ success: false, message: "Size already exists" });


        const newSize = new Size({
            name
        });

        await newSize.save();

        res.status(201).json(newSize);
        console.log("nueva talla creada:", newSize);


    } catch (error) {
        res.json(error)
    }
};

sizeCtrl.getSizes = async (req, res) => {

    const { desde = 0, limite = 20 } = req.query

    try {
        const [total, listSizes] = await Promise.all([
            Size.countDocuments(),
            Size.find()
                .skip(desde)
                .limit(limite)
        ])

        if (total > 0) res.status(200).json({ total, listSizes })
        else res.status(404).send("no sizes found")


    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = sizeCtrl;