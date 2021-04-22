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
        type: String,
        required: true
    },

    size: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],

    price: {
        type: Number,
        required: true
    },

    tags: {
        type: Array,
        default: null
    },

    status: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true,
    versionKey: false
});

module.exports = model("Product", ProductSchema);