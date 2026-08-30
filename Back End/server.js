require("dotenv").config();

const express = require("express");
const cors = require("cors")
const connectDB = require("./Config/database")
const app = express();

//estos son los middlewares
app.use(cors());
app.use(express.json());


//ruta para probars
app.get("/api/health", (req, res) => {
    res.status(200).json({
        ok: true,
        message: "Lani API funcionando"
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(
            `Servidor de Lani ejecutándose en el puerto ${PORT}`
        );
    });
};

startServer()