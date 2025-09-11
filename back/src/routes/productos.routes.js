import { Router } from 'express';

import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from '../controllers/productoController.js';


const router = Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);
router.get('/:id/mensajes', getMensajesByProducto);
router.post('/:id/mensajes', createMensaje);

export default router;
