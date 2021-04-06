const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    name: {
        type: String
    }
},{
    versionKey:false
})


module.exports = model("Category", CategorySchema)