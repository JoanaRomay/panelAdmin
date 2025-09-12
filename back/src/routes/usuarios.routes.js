import { Router } from "express";
import { 
  getUsuarios, 
  getUsuarioById, 
  createUsuario, 
  updateUsuario, 
  deleteUsuario 
} from "../controllers/usuarioController.js";
import { 
  validateUsuarioCreate, 
  validateUsuarioUpdate, 
  validateUsuarioId, 
  validatePagination 
} from "../middleware/validation.js";

const router = Router();

router.get("/", validatePagination, getUsuarios);
router.get("/:id", validateUsuarioId, getUsuarioById);
router.post("/", validateUsuarioCreate, createUsuario);
router.put("/:id", validateUsuarioId, validateUsuarioUpdate, updateUsuario);
router.delete("/:id", validateUsuarioId, deleteUsuario);

export default router;
