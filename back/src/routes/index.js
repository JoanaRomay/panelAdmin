import { Router } from 'express';
import categoriaRouter from './categorias.routes.js';
import productoRouter from './productos.routes.js'; 
// import usuarioRouter from './usuarios.routes.js';   // si tenés

const router = Router();

// Montar routers
router.use('/categorias', categoriaRouter);
router.use('/productos', productoRouter);
// router.use('/usuarios', usuarioRouter);

export default router;
