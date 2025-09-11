    import Producto from "../models/Producto.js";

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos." });
  }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado." });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto." });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    imgUrl,
    tipoMascota,
    fechaCreacion,
    idCategoria,
    descuento,   
    oferta   
  } = req.body;

  try {
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      imgUrl,
      tipoMascota,
      fechaCreacion,
      idCategoria,
      descuento,   
      oferta  
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto." });
  }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    precio,
    stock,
    imgUrl,
    tipoMascota,
    fechaCreacion,
    idCategoria,
    descuento,   
    oferta  
  } = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado." });

    await producto.update({
      nombre,
      descripcion,
      precio,
      stock,
      imgUrl,
      tipoMascota,
      fechaCreacion,
      idCategoria,
      descuento, 
      oferta  
    });

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto." });
  }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado." });

    await producto.destroy();
    res.json({ message: "Producto eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
};
