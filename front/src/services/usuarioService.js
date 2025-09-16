import api from './api';

const BASE_URL = '/usuarios';

const usuarioService = {
  // Obtener todos los usuarios
  getAll: async ({ page = 1, limit = 10, search } = {}) => {
    const params = {
      page,
      limit,
      ...(search ? { search } : {}),    
    };
    return api.get(BASE_URL, { params });
  },

  // Obtener usuario por ID
  getById: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.get(`${BASE_URL}/${id}`);
  },

  // Crear usuario
  create: async (data) => {
    if (!data) throw new Error("Datos requeridos");
    return api.post(BASE_URL, data);
  },

  // Actualizar usuario
  update: async (id, data) => {
    if (!id || !data) throw new Error("ID y datos requeridos");
    return api.put(`${BASE_URL}/${id}`, data);
  },

  // Eliminar usuario
  delete: async (id) => {
    if (!id) throw new Error("ID requerido");
    return api.delete(`${BASE_URL}/${id}`);
  }
};

export default usuarioService;
