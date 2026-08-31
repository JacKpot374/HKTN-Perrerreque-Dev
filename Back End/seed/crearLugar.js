require("dotenv").config();

const connectDB = require("../Config/database");
const Lugar = require("../Models/Lugar");

const crearLugarDemo = async () => {
    try {

        await connectDB();

        const lugar = await Lugar.create({
            nombre: "Destino Demo Granada",

            descripcion:
                "Destino turístico alternativo utilizado para probar Lani.",

            ubicacion: {
                type: "Point",
                coordinates: [-85.9560, 11.9290]
            },

            direccion: "Granada, Nicaragua",

            nivelSaturacion: "BAJA",

            activo: true
        });

        console.log("Lugar creado correctamente:");
        console.log(lugar);

        process.exit(0);

    } catch (error) {

        console.error(
            "Error al crear lugar:",
            error.message
        );

        process.exit(1);
    }
};

crearLugarDemo();