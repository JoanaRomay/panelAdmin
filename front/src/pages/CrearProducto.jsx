import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import { useNavigate } from "react-router-dom"

function CrearProducto() {

    const navigate = useNavigate();
 const irAtras = () => {
    navigate('/productos')
  }
return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1">
        <SideBar />

              <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
                  <div className="flex justify-between items-center">
                      <h2 className="text-white text-3xl font-bold leading-none mb-10">Crear producto</h2>
                      <button onClick={irAtras} className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                                    Atrás
                      </button>
                </div>
                <div className="flex flex-col min-h-screen">


  <div className="flex flex-1">


    {/* Main Content */}
    <main className="flex-1 bg-amber-950 overflow-y-auto">
     

      {/* Form */}
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Básica */}
            <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border mb-10 border-gray-100">
              <h2 className="text-lg font-semibold">Información Básica</h2>
              <p className="text-sm text-gray-500">
                Información principal del producto
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre del Producto"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                <textarea
                  placeholder="Descripción del producto"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* Precios e Inventario */}
            <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border border-gray-100">
              <h2 className="text-lg font-semibold">Precios e Inventario</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  placeholder="Precio ($)"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Categoría y Estado */}
            <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border border-gray-100">
              <h2 className="text-lg font-semibold">Categoría y Estado</h2>
              <select className="w-full border border-gray-300 p-2 rounded-lg">
                <option>Seleccionar categoría</option>
                <option>Ropa</option>
                <option>Calzado</option>
                <option>Electrónica</option>
              </select>
              <select className="w-full border border-gray-300 p-2 rounded-lg">
                <option>Activo</option>
                <option>Borrador</option>
                <option>Inactivo</option>
              </select>
            </div>

            {/* Imagen */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center"> 
                    <div className="flex flex-col text-start">
                        <h2>Imagen</h2>
                        <p  className="text-sm text-gray-500 pb-3">Sube una imagen para el producto</p>
                    </div>
                                          
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="mb-4 h-12 w-12 mx-auto bg-gray-200 rounded-full"></div>
                <p className="text-sm text-gray-500 mb-2">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <button className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  Seleccionar Imagen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
            Cancelar
          </button>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
            Crear Producto
          </button>
        </div>
      </div>
    </main>
  </div>
</div>


        
            
        </main>
      </div>
    </div>
  )
}

export default CrearProducto