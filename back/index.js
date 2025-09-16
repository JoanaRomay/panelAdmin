import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize, Categoria, Producto, Orden, DetalleOrden } from '../back/src/models/index.js';
import router from './src/routes/index.js';

const app = express(); // 👉 primero se declara app
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://tu-dominio.com'
        : 'http://localhost:5175', 
    credentials: true
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'development' ? "dev" : "combined"));

app.use('/api', router); // 👉 ahora sí podés usar app

// Ruta de salud de la API
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.use('/img', express.static('public/img'));

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ alter: true });
    console.log('🔁 Tablas revisadas y sincronizadas correctamente.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();
