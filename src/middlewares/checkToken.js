
const config = require("../config");
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {

    //Verificar existencia de token.
    try {
        var token = req.headers.token

        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {

                if (err) {
                    return res.status(403).send({ success: false, message: "Failed to authenticate token." })
                } else {
                    req.userId = decoded.id //Guarda el id del user.
                    next();
                }
            });

        } else {
            return res.status(403).send({ success: false, message: "No Token Provided." });
        }

    } catch (err) {
        return res.status(403).send({ success: false, message: "Unauthorized" });
    }
}

module.exports = checkToken;