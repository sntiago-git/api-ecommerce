
const User = require("../models/User");
const Role = require("../models/Role");

const isAdmin = async (req, res, next) => {

    //Verificar rol admin
    const user = await User.findById(req.userId, { password: 0, email: 0 });
    const roles = await Role.find({ _id: { $in: user.roles } }); //$in = for in

    for (let i = 0; i < roles.length; i++) {

        if (roles[i].name === "admin") {
            next();
            return;
        }
    }

    return res.status(403).send({ success: false, message: "Access Denied, require admin role" });
}


module.exports = isAdmin;