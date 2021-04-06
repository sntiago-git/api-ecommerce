const { Schema, model } = require("mongoose");

const ColorSchema = new Schema({
    name: {
        type: String
    }
}, {
    versionKey: false
})


module.exports = model("Color", ColorSchema)