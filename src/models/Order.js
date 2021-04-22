const { Schema, model } = require("mongoose");

const orderSchema = new Schema({

    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    
    products: [{

        product: {
            ref: "Product",
            type: Schema.Types.ObjectId,
            required: true
        },

        qty: {
            type: Number,
            required: true
        },

        size: {
            type: String,
            required: true
        },

        value: {
            type: Number
        },
    }],

    subtotal: {
        type: Number,
        required: true
    },

    IVA: {
        type: Number,
        required: true
    },

    total_value: {
        type: Number,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Order", orderSchema);
