import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
 
// En la variable app tendremos toda la funcionalidad necesaria para crear el server
const app = express();

// Le decimos a express que le enviaremos datos de tipo JSON
app.use(express.json());

// Leer archivo .env
dotenv.config()
conectarDB();

// CORS
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    },
};

app.use(cors( corsOptions ));


// Configurar el middleware para la ruta '/'
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);


// Cuando se haga el deployment el puerto se asigna automaticamente
const PORT = process.env.PORT || 4000

// Poner en marcha el server
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})
