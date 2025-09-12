import { Producto, Categoria } from "../models/index.js";
import { Op } from "sequelize";
import { validationResult } from "express-validator";

// Obtener todos los productos con su categoría
export const getProductos = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sort = "id", direction = "DESC" } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { nombre: { [Op.like]: `%${search}%` } },
        { descripcion: { [Op.like]: `%${search}%` } },
      ];
    }

    const productos = await Producto.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, direction.toUpperCase()]],
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });

    res.json({
      success: true,
      data: productos.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(productos.count / limit),
        totalItems: productos.count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("Error en getProductos:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Obtener producto por ID con su categoría
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ success: false, error: "ID inválido" });

    const producto = await Producto.findByPk(id, {
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });

    if (!producto) return res.status(404).json({ success: false, error: "Producto no encontrado" });

    res.json({ success: true, data: producto });
  } catch (err) {
    console.error("Error en getProductoById:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Crear producto
export const createProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const { nombre, descripcion, precio, stock, idCategoria, imgUrl, tipoMascota, oferta, descuento } = req.body;

    // Verificar que la categoría exista
    const categoria = await Categoria.findByPk(idCategoria);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      idCategoria,
      imgUrl,
      tipoMascota,
      oferta: oferta || false,
      descuento: descuento || 0,
    });

    res.status(201).json({ success: true, data: nuevoProducto, message: "Producto creado exitosamente" });
  } catch (err) {
    console.error("Error en createProducto:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Actualizar producto
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ success: false, error: "Producto no encontrado" });

    // Si envían idCategoria, verificar que exista
    if (req.body.idCategoria) {
      const categoria = await Categoria.findByPk(req.body.idCategoria);
      if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });
    }

    await producto.update(req.body);

    // Traer producto actualizado con categoría
    const productoActualizado = await Producto.findByPk(id, {
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });

    res.json({ success: true, data: productoActualizado, message: "Producto actualizado exitosamente" });
  } catch (err) {
    console.error("Error en updateProducto:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Eliminar producto (físico)
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ success: false, error: "Producto no encontrado" });

    await producto.destroy();
    res.json({ success: true, message: "Producto eliminado exitosamente" });
  } catch (err) {
    console.error("Error en deleteProducto:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Obtener productos por categoría
export const getProductosByCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    const productos = await Producto.findAndCountAll({
      where: { idCategoria: id },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["fechaCreacion", "DESC"]],
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });

    res.json({
      success: true,
      data: productos.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(productos.count / limit),
        totalItems: productos.count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("Error en getProductosByCategoria:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
