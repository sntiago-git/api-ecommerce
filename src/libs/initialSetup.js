const Role = require("../models/Role");

//Inicializar roles predeterminados.

const createRoles = async () => {

    try {

        const count = await Role.estimatedDocumentCount();
  
        if (count > 0) return;

        const roles = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderador" }).save(),
            new Role({ name: "admin" }).save()
        ]);

        console.log(roles);

    } catch (error) {
        console.error(error);
    }
};

exports.createRoles = createRoles
