import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import categoriaService from "../services/categoriaService";
import { Edit, Trash2, RotateCw} from "lucide-react";



function Categorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");

  // Traer categorías del backend
useEffect(() => {
  const fetchCategorias = async () => {
    try {
      const res = await categoriaService.getAll(); 
      console.log("Respuesta del backend:", res.data); 
      setCategorias(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error al obtener categorias:", err);
      setCategorias([]);
    }
  };

  fetchCategorias();
}, []);

  // Maneja navegación a nueva categoría
  const irANuevaCategoria = () => {
    navigate('/categorias/nuevaCategoria');
  };

  const irACategoriaEditar = () => {
    navigate('/categorias/CategoriaEditar')
  }


  // Manejo de eliminar categoría
  const handleDelete = async (categoria) => {
  if (!categoria?.id) return;

  if (!window.confirm(`¿Desea eliminar la categoría "${categoria.nombre}"?`)) return;

  try {
    // Esto elimina en la base de datos
    await categoriaService.delete(categoria.id);

    // Actualiza la tabla en la UI
    setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));

    alert("Categoría eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    alert("No se pudo eliminar la categoría");
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
              <div>        
                <button onClick={irANuevaCategoria} className="inline-flex items-center px-3 py-2 mr-3 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                   
                            Nueva Categoría
                </button>
                <button onClick={irACategoriaEditar} className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                   
                            Editar Categoría
                </button>              
              </div>
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
                      <th className="py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {categorias.map((categoria) => (
                      <tr key={categoria.id} className="hover:bg-gray-50 relative">
                        <td className="py-3">
                          <div className="font-medium text-gray-900">{categoria.nombre}</div>
                         
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
                       
                       <td className="py-3 text-right">
                    <div className="flex justify-end space-x-2">
                            
   <button
        onClick={() => handleDelete(categoria)}
        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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

export default Categorias;
