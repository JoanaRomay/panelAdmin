import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import categoriaService from "../services/categoriaService";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

function Categorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null); // ID de la fila cuyo dropdown está abierto
  const dropdownRef = useRef();

  // Traer categorías del backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await categoriaService.getAll({ search, activa: "all" });
        setCategorias(res.data.data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    fetchCategorias();
  }, [search]);

  // Maneja navegación a nueva categoría
  const irANuevaCategoria = () => {
    navigate('/categorias/nuevaCategoria');
  };

  // Abrir/cerrar dropdown
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejo de eliminar categoría
  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Desea eliminar la categoría "${nombre}"?`)) {
      // Aquí llamás a tu servicio de delete
      console.log("Eliminar categoría:", id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none">Categorías</h2>
            <button
              onClick={irANuevaCategoria}
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nueva Categoría
            </button>
          </div>

          <div className="space-y-6 mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Todas las Categorías</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Lista completa de categorías de productos
                  </p>
                </div>
                <div className="relative w-80">
                  <svg
                    className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar categorías..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="px-6 py-4 overflow-x-auto">
                <table className="w-full min-w-[700px] divide-y divide-gray-100">
                  <thead className="bg-transparent">
                    <tr className="text-left text-sm text-gray-600">
                      <th className="py-3 pr-4">Nombre</th>
                      <th className="py-3 pr-4">Descripción</th>
                      <th className="py-3 pr-4">Estado</th>
                      <th className="py-3 pr-4">Fecha Creación</th>
                      <th className="py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {categorias.map((categoria) => (
                      <tr key={categoria.id} className="hover:bg-gray-50 relative">
                        <td className="py-3">
                          <div className="font-medium text-gray-900">{categoria.nombre}</div>
                          <div className="text-xs text-gray-500">ID: {categoria.id}</div>
                        </td>
                        <td className="py-3 max-w-xs">
                          <div className="truncate text-gray-700">{categoria.descripcion}</div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              categoria.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {categoria.activa ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="py-3 text-gray-700">{new Date(categoria.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 text-right" ref={dropdownRef}>
                          <button
                            onClick={() => toggleDropdown(categoria.id)}
                            className="inline-flex items-center justify-center h-8 w-8 p-0 rounded-md hover:bg-gray-50"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                          {openDropdownId === categoria.id && (
                            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-10">
                              <Link to={`/admin/categories/${categoria.id}/edit`}>
                                <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                  <Edit className="h-4 w-4" />
                                  Editar
                                </div>
                              </Link>
                              <div
                                onClick={() => handleDelete(categoria.id, categoria.nombre)}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                                Eliminar
                              </div>
                            </div>
                          )}
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

export default Categorias;
