import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import productoService from "../services/productoService";
import { Trash2, SquarePlus, SquarePen } from "lucide-react";

function Productos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");

  const irACrearProducto = () => {
    navigate('/productos/crearProducto');
  };

  const irAProductoEditar = () => {
    navigate('/productos/productoEditar');
  };

  // Traer productos desde la BD
  const fetchProductos = async () => {
  try {
    const res = await productoService.getAll({ search });
    console.log("Respuesta del backend:", res.data); // 🔍 revisar estructura
    // ✅ extraemos el array real de productos
    setProductos(Array.isArray(res.data?.data) ? res.data.data : []);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    setProductos([]);
  }
};

  useEffect(() => {
    fetchProductos();
  }, [search]);

  const handleDelete = async (producto) => {
    if (!producto?.id) return;

    if (!window.confirm(`¿Desea eliminar el producto "${producto.nombre}"?`)) return;

    try {
      await productoService.delete(producto.id);
      setProductos((prev) => prev.filter((p) => p.id !== producto.id));
      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none">Productos</h2>
            <div>        
              <button onClick={irACrearProducto} className="inline-flex items-center px-3 py-2 mr-3 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <SquarePlus />
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

          {/* Tabla de productos */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Todos los Productos</h3>
                <p className="text-sm text-gray-500 mt-0.5">Lista completa de productos en tu tienda</p>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] divide-y divide-gray-100">
                  <thead className="bg-transparent">
                    <tr className="text-left text-sm text-gray-600">
                      <th className="py-3 pr-4">Producto</th>
                      <th className="py-3 pr-4">Categoría</th>
                      <th className="py-3 pr-4">Precio</th>
                      <th className="py-3 pr-4">Stock</th>
                      <th className="py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {productos?.map((producto) => (
                      <tr key={producto.id} className="hover:bg-gray-50 relative">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <img src={producto.imgUrl || 'https://via.placeholder.com/40'} alt={producto.nombre} className="h-10 w-10 rounded-md object-cover" />
                            <div className="leading-tight">
                              <div className="font-medium text-gray-900">{producto.nombre}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-gray-700">{producto.categoria?.nombre || '-'}</td>
                        <td className="py-3 text-sm text-gray-700">${producto.precio}</td>
                        <td className="py-3 text-sm text-gray-700">{producto.stock} unidades</td>
                        <td className="py-3 text-right">
                                <div className="flex justify-end">
                                     <button  className="text-blue-600" title="Editar">
                              <SquarePen className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDelete(producto)} className="text-red-600 hover:text-red-900" title="Eliminar">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {productos.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                          No hay productos disponibles
                        </td>
                      </tr>
                    )}
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

export default Productos;
