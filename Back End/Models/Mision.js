const mongoose = require("mongoose");

const misionSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true
        },

        descripcion: {
            type: String,
            required: true,
            trim: true
        },

        instrucciones: {
            type: String,
            required: true,
            trim: true
        },

        tipo: {
            type: String,
            enum: [
                "VISITAR_LUGAR",
                "TRIVIA",
                "COMPRA_LOCAL",
                "FOTOGRAFIA"
            ],
            required: true
        },

        puntosOtorgados: {
            type: Number,
            required: true,
            min: 0
        },

        lugarId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lugar",
            required: true
        },

        recompensas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recompensa"
            }
        ],

        activa: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Mision = mongoose.model("Mision", misionSchema);

module.exports = Mision;