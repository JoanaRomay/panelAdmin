import { Router } from 'express';
import categoriaRouter from './categorias.routes.js';
import productoRouter from './productos.routes.js';
import usuarioRouter from './usuarios.routes.js'; 
import rolRouter from './roles.routes.js'; 
const router = Router();

router.use('/categorias', categoriaRouter);
router.use('/productos', productoRouter);
router.use('/usuarios', usuarioRouter);  
router.use('/roles', rolRouter);  

export default router;
