import api from './api';

const BASE_URL = '/categorias';

const categoriaService = {
  // Obtener todas las categorías con filtros y paginación
  getAll: async ({ page = 1, limit = 10, search, activa } = {}) => {
    const params = {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(activa !== undefined ? { activa } : {}),
    };

    return api.get(BASE_URL, { params });
  },

  // Obtener categoría por ID
  getById: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.get(`${BASE_URL}/${id}`);
  },

  // Crear categoría
  create: async (data) => {
    if (!data) throw new Error("Datos requeridos");
    return api.post(BASE_URL, data);
  },

  // Actualizar categoría
  update: async (id, data) => {
    if (!id || !data) throw new Error("ID y datos requeridos");
    return api.put(`${BASE_URL}/${id}`, data);
  },

  // Eliminar categoría (soft delete)
  delete: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.delete(`${BASE_URL}/${id}`);
  },

  // Obtener productos de una categoría
  getProductosByCategoria: async (id, { page = 1, limit = 10 } = {}) => {
    if (!id) throw new Error("ID requerido");
    return api.get(`${BASE_URL}/${id}/productos`, { params: { page, limit } });
  }
};

export default categoriaService;
