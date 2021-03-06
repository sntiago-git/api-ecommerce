const { Schema, model } = require("mongoose");

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    
    status: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("User", UserSchema);
