import { Usuario, Rol } from "../models/index.js";
import { Op } from "sequelize";
import { validationResult } from "express-validator";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, rolId, sort = "id", direction = "DESC" } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { nombre: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (rolId) {
      whereClause.rolId = rolId;
    }

    const usuarios = await Usuario.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, direction.toUpperCase()]],
      include: [{ model: Rol, attributes: ["codigo", "descripcion"] }]
    });

    res.json({
      success: true,
      data: usuarios.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(usuarios.count / limit),
        totalItems: usuarios.count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error("Error en getUsuarios:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) 
      return res.status(400).json({ success: false, error: "ID inválido" });

    const usuario = await Usuario.findByPk(id, {
      include: [{ model: Rol, attributes: ["codigo", "descripcion"] }]
    });

    if (!usuario) 
      return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    res.json({ success: true, data: usuario });
  } catch (err) {
    console.error("Error en getUsuarioById:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Crear usuario
export const createUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const { nombre, email, password, rolId } = req.body;

    const existente = await Usuario.findOne({ where: { email } });
    if (existente) return res.status(400).json({ success: false, error: "Ya existe un usuario con ese email" });

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password, // En producción deberías hashear el password
      rolId
    });

    res.status(201).json({ success: true, data: nuevoUsuario, message: "Usuario creado exitosamente" });
  } catch (err) {
    console.error("Error en createUsuario:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
// Actualizar usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    const { nombre, email, password, rolId } = req.body;

    await usuario.update({
      nombre: nombre !== undefined ? nombre : usuario.nombre,
      email: email !== undefined ? email : usuario.email,
      password: password !== undefined ? password : usuario.password, // En prod, hash
      rolId: rolId !== undefined ? rolId : usuario.rolId
    });

    res.json({ success: true, data: usuario, message: "Usuario actualizado exitosamente" });
  } catch (err) {
    console.error("Error en updateUsuario:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    await usuario.destroy();
    res.json({ success: true, message: "Usuario eliminado exitosamente" });
  } catch (err) {
    console.error("Error en deleteUsuario:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
