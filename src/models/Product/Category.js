const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    }
},{
    versionKey:false
})


module.exports = model("Category", CategorySchema)