
const User = require("../models/User");

const checkUser = async (req, res, next) => {

    //Valida contraseñas y existencia de email.

    try {
        const email = req.body.email.trim().toUpperCase();
        const {password, confirm_password } = req.body;
       
        var errors = [];

        if (password != confirm_password) errors.push({ "text": "password does not match" });

        if (password.length < 6) errors.push({ "text": "password must be at least 6 characters" });

        if (errors.length > 0) return res.status(403).json(errors);
    
        //Validacion de email.
        const userFound = await User.findOne({ "email": email });
        if (userFound) return res.status(400).json({ success: false, message: "user already exists" });
    
        next();

    } catch (err) {
        return res.status(400).send({ success: false, message: "request empty" });
    }
};

module.exports = checkUser