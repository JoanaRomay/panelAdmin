import api from './api';

const BASE_URL = '/productos';

const productoService = {
  // Obtener todos los productos con filtros y paginación
  getAll: async ({ page = 1, limit = 10, search, idCategoria } = {}) => {
    const params = {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(idCategoria ? { idCategoria } : {}),
    };

    return api.get(BASE_URL, { params });
  },

  // Obtener producto por ID
  getById: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.get(`${BASE_URL}/${id}`);
  },

  // Crear producto
  create: async (data) => {
    if (!data) throw new Error("Datos requeridos");
    return api.post(BASE_URL, data);
  },

  // Actualizar producto
  update: async (id, data) => {
    if (!id || !data) throw new Error("ID y datos requeridos");
    return api.put(`${BASE_URL}/${id}`, data);
  },

  // Eliminar producto
  delete: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.delete(`${BASE_URL}/${id}`);
  },

  // Obtener productos de una categoría específica
  getByCategoria: async (idCategoria, { page = 1, limit = 10 } = {}) => {
    if (!idCategoria) throw new Error("ID de categoría requerido");
    return api.get(`${BASE_URL}/${idCategoria}/categoria`, { params: { page, limit } });
  }
};

export default productoService;
