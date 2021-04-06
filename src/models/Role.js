const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
    name: {
        type: String
    }
},{
    versionKey:false
})


module.exports = model("Role", RoleSchema)