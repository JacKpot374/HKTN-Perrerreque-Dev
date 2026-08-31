const mongoose = require("mongoose");

const perfilJugadorSchema = new mongoose.Schema(
    {
        puntos: {
            type: Number,
            default: 0,
            min: 0
        },

        nivel: {
            type: Number,
            default: 1,
            min: 1
        },

        insigniasGanadas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recompensa"
            }
        ]
    },
    {
        _id: false
    }
);

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        contrasenaHash: {
            type: String,
            required: true
        },

        rol: {
            type: String,
            enum: ["TURISTA", "ADMINISTRADOR", "AUDITOR"],
            required: true
        },

        fotoPerfil: {
            type: String,
            default: null
        },

        activo: {
            type: Boolean,
            default: true
        },

        perfilJugador: {
            type: perfilJugadorSchema,
            default: undefined
        }
    },
    {
        timestamps: true
    }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;