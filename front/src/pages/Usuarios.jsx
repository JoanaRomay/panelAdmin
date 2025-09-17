import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import usuarioService from "../services/usuarioService";
import { Edit, Trash2 } from "lucide-react";

function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");

  // Traer usuarios del backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await usuarioService.getAll({ search });
        setUsuarios(res.data.data);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
      }
    };
    fetchUsuarios();
  }, [search]);

  // Navegar a crear usuario
  const irANuevoUsuario = () => {
    navigate("/usuarios/nuevo");
  };

  // Navegar a editar usuario
  const irAUsuarioEditar = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  // Manejo de eliminar usuario
  const handleDelete = async (usuario) => {
    if (!usuario?.id) return;

    if (!window.confirm(`¿Desea eliminar al usuario "${usuario.nombre}"?`)) return;

    try {
      await usuarioService.delete(usuario.id);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("No se pudo eliminar el usuario");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none">Usuarios</h2>
            <div>
              <button
                onClick={irANuevoUsuario}
                className="inline-flex items-center px-3 py-2 mr-3 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
              >
                Nuevo Usuario
              </button>
            </div>
          </div>
 {/* Buscador */}
          <div className="flex items-center mt-6 mb-4">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-6 mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Todos los Usuarios</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Lista completa de usuarios del sistema
                  </p>
                </div>
                
              </div>

              <div className="px-6 py-4 overflow-x-auto">
                <table className="w-full min-w-[700px] divide-y divide-gray-100">
                  <thead className="bg-transparent">
                    <tr className="text-left text-sm text-gray-600">
                      <th className="py-3 pr-4">Nombre</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Rol</th>
                      <th className="py-3 pr-4">Fecha Creación</th>
                      <th className="py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50 relative">
                        <td className="py-3">
                          <div className="font-medium text-gray-900">{usuario.nombre}</div>
                          <div className="text-xs text-gray-500">ID: {usuario.id}</div>
                        </td>
                        <td className="py-3 max-w-xs">
                          <div className="truncate text-gray-700">{usuario.email}</div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              usuario.rol?.codigo === "ADMIN"
                                ? "bg-indigo-100 text-indigo-800"
                                : usuario.rol?.codigo === "SUPER_ADMIN"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {usuario.rol?.codigo || "Sin rol"}
                          </span>
                        </td>
                        <td className="py-3 text-gray-700">
                          {new Date(usuario.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => irAUsuarioEditar(usuario.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Editar"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(usuario)}
                              className="text-red-600 hover:text-red-900"
                              title="Eliminar"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Usuarios;
