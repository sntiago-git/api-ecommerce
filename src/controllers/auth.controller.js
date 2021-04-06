authCtrl = {};

const { User, Role } = require("../models");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");


authCtrl.signUp = async (req, res) => {

    const email = req.body.email.trim().toUpperCase();
    const { name, password} = req.body;

    const newUser = User({ name, email, password });

    //Encriptar password
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);


    /* agregando roles (SOLO ADMIN PUEDE AGREGAR USUARIOS CON ROLES)
   
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        var role_user = await Role.findOne({ "name": "user" });
        newUser.roles = [role_user._id]
    } */


    var role_user = await Role.findOne({ "name": "user" }); //Se agrega rol: user
    newUser.roles = [role_user._id]

    const savedUser = await newUser.save();
    console.log("usuario creado:", savedUser)

    //creando token
    const token = jwt.sign({ id: savedUser._id }, config.secret, {
        expiresIn: 86400  //24 horas
    });

    res.status(201).json({ token })
};



authCtrl.signIn = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ "email": email }).populate("roles");

    if (user) {

        //verificar contraseñas.
        const matchPassword = await bcryptjs.compare(password, user.password)

        if (matchPassword) {

            console.log("usuario logeado:", user)

            //Creando token
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400  //24 horas
            });

            res.status(201).json({ token })

        } else {
            res.json({ error: "invalid password" })
        }

    } else {
        res.status(400).json({ error: "user not found" });
    }
};



module.exports = authCtrl;