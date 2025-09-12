import { Router } from "express";
import { 
  getProductos, 
  getProductoById, 
  createProducto, 
  updateProducto, 
  deleteProducto, 
  getProductosByCategoria 
} from "../controllers/productoController.js";

import { 
  validateProductoCreate, 
  validateProductoUpdate, 
  validateProductoId, 
  validatePagination 
} from "../middleware/validation.js";

const router = Router();

// Listar todos los productos con paginación y búsqueda
router.get("/", validatePagination, getProductos);

// Obtener producto por ID
router.get("/:id", validateProductoId, getProductoById);

// Obtener productos por categoría
router.get("/:id/categoria", validateProductoId, validatePagination, getProductosByCategoria);

// Crear un producto
router.post("/", validateProductoCreate, createProducto);

// Actualizar un producto
router.put("/:id", validateProductoId, validateProductoUpdate, updateProducto);

// Eliminar un producto
router.delete("/:id", validateProductoId, deleteProducto);

export default router;
