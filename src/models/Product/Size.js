const { Schema, model } = require("mongoose");

const SizeSchema = new Schema({
    name: {
        type: String
    }
}, {
    versionKey: false
})


module.exports = model("Size", SizeSchema)