import express from 'express';
import cors from 'cors'; // Importa il modulo CORS
import mailRoutes from './routes/mail.route';

const app = express();
app.use(express.json());

// 🔹 Abilita CORS per React
/*app.use(cors({
    origin: 'http://localhost:5173', // Cambia con l'URL del frontend in produzione
    credentials: true // Necessario se usi autenticazione con cookie o token
}));*/

app.use('/api/mail', mailRoutes);

export default app;
