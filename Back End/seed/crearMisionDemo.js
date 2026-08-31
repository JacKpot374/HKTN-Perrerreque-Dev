require("dotenv").config();

const connectDB = require("../Config/database");
const Lugar = require("../Models/Lugar");
const Mision = require("../Models/Mision");

const crearMisionDemo = async () => {
    try {
        await connectDB();

        // Buscar el lugar que creamos anteriormente
        const lugar = await Lugar.findOne({
            nombre: "Destino Demo Granada"
        });

        if (!lugar) {
            console.log(
                "No se encontró el lugar demo. Crea primero el lugar."
            );

            process.exit(1);
        }

        const misionExistente = await Mision.findOne({
            titulo: "Explora un destino alternativo"
        });

        if (misionExistente) {
            console.log("La misión demo ya existe.");
            process.exit(0);
        }

        const mision = await Mision.create({
            titulo: "Explora un destino alternativo",

            descripcion:
                "Descubre un lugar menos concurrido de Granada y conoce una alternativa al turismo tradicional.",

            instrucciones:
                "Dirígete al lugar indicado y visita el destino.",

            tipo: "VISITAR_LUGAR",

            puntosOtorgados: 100,

            lugarId: lugar._id,

            recompensas: [],

            activa: true
        });

        console.log("Misión creada correctamente:");
        console.log(mision);

        process.exit(0);

    } catch (error) {
        console.error(
            "Error al crear la misión:",
            error.message
        );

        process.exit(1);
    }
};

crearMisionDemo();