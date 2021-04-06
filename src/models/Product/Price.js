const { Schema, model } = require("mongoose");

const PriceSchema = new Schema({

    price: {
        type: Number,
        required: true
    },

    sale: {
        salePrice: Number,
        saleEndDate: Date
    },

}, {
    versionKey: false
})


module.exports = model("Price", PriceSchema)