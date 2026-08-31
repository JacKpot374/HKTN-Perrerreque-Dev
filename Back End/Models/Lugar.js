const mongoose = require("mongoose");

const lugarSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        descripcion: {
            type: String,
            required: true,
            trim: true
        },

        ubicacion: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
                default: "Point"
            },

            coordinates: {
                type: [Number],
                required: true
            }
        },

        direccion: {
            type: String,
            trim: true
        },

        nivelSaturacion: {
            type: String,
            enum: ["BAJA", "MEDIA", "ALTA"],
            required: true,
            default: "BAJA"
        },

        imagen: {
            type: String,
            default: null
        },

        activo: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// indicador geoespacial para busquedas cecania
lugarSchema.index({
    ubicacion: "2dsphere"
});

const Lugar = mongoose.model(
    "Lugar",
    lugarSchema
);

module.exports = Lugar;