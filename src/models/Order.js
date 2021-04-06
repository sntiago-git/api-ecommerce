const { Schema, model } = require("mongoose");

const orderSchema = new Schema({

    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    products: [{

        product: {
            ref: "Product",
            type: Schema.Types.ObjectId
        },

        qty: {
            type: Number
        },

        value: {
            type: Number
        },
    }],

    subtotal: {
        type: Number
    },

    IVA: {
        type: Number
    },

    total_value: {
        type: Number
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Order", orderSchema);
