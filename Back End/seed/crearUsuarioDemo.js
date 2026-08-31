require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("../Config/database");
const Usuario = require("../Models/Usuario");

const crearUsuarioDemo = async () => {
    try {
        await connectDB();

        const contrasenaHash = await bcrypt.hash("LaniDemo123", 10);

        const usuario = await Usuario.create({
            nombre: "Turista Demo",
            email: "turista@lani.app",
            contrasenaHash: contrasenaHash,
            rol: "TURISTA",
            activo: true,
            perfilJugador: {
                puntos: 0,
                nivel: 1,
                insigniasGanadas: []
            }
        });

        console.log("Usuario creado correctamente:");
        console.log(usuario);

        process.exit(0);

    } catch (error) {
        console.error("Error al crear usuario:", error.message);
        process.exit(1);
    }
};

crearUsuarioDemo();