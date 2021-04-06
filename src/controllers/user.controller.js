userCtrl = {};

const { User, Role } = require("../models");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");



userCtrl.createUser = async (req, res) => {

    const email = req.body.email.trim().toUpperCase();
    const { name, password, roles } = req.body;

    const newUser = User({ name, email, password });

    //encriptar password
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    //agregando roles
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        var role_user = await Role.findOne({ "name": "user" });
        newUser.roles = [role_user._id] //rol user defoult
    }

    const savedUser = await newUser.save();
    console.log("usuario creado por admin:", savedUser)

    //creando token
    const token = jwt.sign({ id: savedUser._id }, config.secret, {
        expiresIn: 86400  //24 horas
    });

    res.status(201).json({ token })
};


userCtrl.getUsers = async (req, res) => {

    try {

        const usersList = await User.find();

        if (usersList.length > 0) res.json(usersList);
        else res.send("no users found")

    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = userCtrl;