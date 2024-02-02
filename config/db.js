import mongoose from "mongoose";

// Conectar la BD

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);

        // Obtener la URL y el puerto donde se está conectando
        const url = `${db.connection.host}:${db.connection.port}`;

        console.log(`MongoDB conectado en: ${url}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};



export default conectarDB

// process.exit indica que hay un error en la conexion a la BD y termina el proceso de node con un codigo de salida especifico, en este caso 1