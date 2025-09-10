import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import { useNavigate } from "react-router-dom"

function Categorias() {
    const navigate = useNavigate();
    
        const irANuevaCategoria = () => { 
            navigate('/categorias/nuevaCategoria')
        }
    
     

return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1">
        <SideBar />

              <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
                  <div className="flex justify-between items-center">
                      <h2 className="text-white text-3xl font-bold leading-none">Categorias</h2>
                      <button onClick={irANuevaCategoria} className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                                     Nuevo Categoria
                      </button>
                </div>

                <div className="space-y-6">
  {/* Header */}
 
  {/* Card */}
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    {/* CardHeader */}
    <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold">Todas las Categorías</h3>
        <p className="text-sm text-gray-500 mt-0.5">
          Lista completa de categorías de productos
        </p>
      </div>
      <div className="relative w-80">
        <svg className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar categorías..."
          className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
        />
      </div>
    </div>

    {/* CardContent / Tabla */}
    <div className="px-6 py-4 overflow-x-auto">
      <table className="w-full min-w-[700px] divide-y divide-gray-100">
        <thead className="bg-transparent">
          <tr className="text-left text-sm text-gray-600">
            <th className="py-3 pr-4">Nombre</th>
            <th className="py-3 pr-4">Descripción</th>
            <th className="py-3 pr-4">Productos</th>
            <th className="py-3 pr-4">Estado</th>
            <th className="py-3 pr-4">Fecha Creación</th>
            <th className="py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {/* Fila de ejemplo */}
          <tr className="hover:bg-gray-50">
            <td className="py-3">
              <div className="font-medium text-gray-900">Juguetes</div>
              <div className="text-xs text-gray-500">ID: 1</div>
            </td>
            <td className="py-3 max-w-xs">
              <div className="truncate text-gray-700">Pelotas y muñecos variados</div>
            </td>
            <td className="py-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                10 productos
              </span>
            </td>
            <td className="py-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                Activo
              </span>
            </td>
            <td className="py-3 text-gray-700">2025-09-10</td>
            <td className="py-3 text-right">
              <button className="inline-flex items-center justify-center h-8 w-8 p-0 rounded-md hover:bg-gray-50">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6h.01M12 12h.01M12 18h.01" />
                </svg>
              </button>
            </td>
          </tr>

          {/* Otra fila de ejemplo */}
          <tr className="hover:bg-gray-50">
            <td className="py-3">
              <div className="font-medium text-gray-900">Deportes</div>
              <div className="text-xs text-gray-500">ID: 2</div>
            </td>
            <td className="py-3 max-w-xs">
              <div className="truncate text-gray-700">Pelotas y raquetas</div>
            </td>
            <td className="py-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                5 productos
              </span>
            </td>
            <td className="py-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Inactivo
              </span>
            </td>
            <td className="py-3 text-gray-700">2025-08-30</td>
            <td className="py-3 text-right">
              <button className="inline-flex items-center justify-center h-8 w-8 p-0 rounded-md hover:bg-gray-50">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6h.01M12 12h.01M12 18h.01" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

            </main>
        </div>
    </div>

    
  )
}

export default Categorias