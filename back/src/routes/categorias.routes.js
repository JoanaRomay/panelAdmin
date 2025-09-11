import { Router } from 'express';
import { 
  getCategorias, 
  getCategoriaById, 
  createCategoria, 
  updateCategoria, 
  deleteCategoria, 
  getProductosByCategoria 
} from '../controllers/categoriaController.js';
import { 
  validateCategoriaCreate, 
  validateCategoriaUpdate, 
  validateCategoriaId, 
  validatePagination 
} from '../middleware/validation.js';

const router = Router();

router.get('/', validatePagination, getCategorias);
router.get('/:id', validateCategoriaId, getCategoriaById);
router.get('/:id/productos', validateCategoriaId, validatePagination, getProductosByCategoria);
router.post('/', validateCategoriaCreate, createCategoria);
router.put('/:id', validateCategoriaId, validateCategoriaUpdate, updateCategoria);
router.delete('/:id', validateCategoriaId, deleteCategoria);

export default router;
