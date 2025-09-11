import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import { useNavigate } from "react-router-dom"

function CategoriaEditar() {


return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1">
        <SideBar />

              <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
                  <div className="flex justify-between items-center">
                      <h2 className="text-white text-3xl font-bold leading-none mb-10">Editar Categoria</h2>
                      <button onClick={irAtras} className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                                    Atrás
                      </button>
                </div>
              
      
    </main>
  </div>
</div>


        
            
      
  )
}

export default CategoriaEditar