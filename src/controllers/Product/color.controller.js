colorCtrl = {};

const { Color } = require("../../models");


colorCtrl.addColor = async (req, res) => {
    
    try {
        const name = req.body.name.toUpperCase().trim();
        console.log(name)

        //Verificar existencia de color
        const colorFound = await Color.findOne({ "name": name });
        if (colorFound) return res.status(400).send({ success: false, message: "Color already exists" });

        console.log(colorFound)

        const newColor = new Color({
            name
        });

        await newColor.save();

        res.status(201).json(newColor);
        console.log("nueva color creado:", newColor);


    } catch (error) {
        res.json(error)
    }
};

colorCtrl.getColors = async (req, res) => {

    const { desde = 0, limite = 20 } = req.query

    try {
        const [total, listColors] = await Promise.all([
            Color.countDocuments(),
            Color.find()
                .skip(desde)
                .limit(limite)
        ])

        if (total > 0) res.status(200).json({ total, listColors })
        else res.status(404).send("no colors found")


    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = colorCtrl;