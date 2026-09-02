const mongoose = require('mongoose');

// Sustituye <password> y <cluster> por tus credenciales de MongoDB Atlas
const MONGO_URI = 'mongodb+srv://admin:<password>@<cluster>.mongodb.net/lani_db?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('🔥 MongoDB Conectado exitosamente');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
