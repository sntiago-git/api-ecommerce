const { Schema, model } = require("mongoose");


const ProductSchema = new Schema({

    sku: {
        type: String,
        required: true,
        unique: true
    },

    tittle: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: null
    },

    category: {
        ref: "Category",
        type: Schema.Types.ObjectId,
        required: true
    },

    color: {
        ref: "Color",
        type: Schema.Types.ObjectId,
        required: true
    },

    size: {
        ref: "Size",
        type: Schema.Types.ObjectId,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    tags: {
        type: Array,
        default: null
    },

    quantity: {
        type: Number,
        required: true
    }
    
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model("Product", ProductSchema);