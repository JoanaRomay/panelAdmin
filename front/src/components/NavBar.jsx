import { Link } from 'react-router-dom'
import { Home, Users, Tag, LogOut } from "lucide-react"

export default function NavBar() {
  return (
      <>
      <div className="h-20 bg-amber-200 flex items-center justify-between pl-14 pr-14">
              <h1 className="font-bold text-xl ">Panel de Administración</h1>  
               <div className="flex">

                  <div className="hidden md:ml-6 md:flex md:space-x-4">
                    <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Home className="h-5 w-5 mr-1" />
                      Inicio
                    </Link>
                    <Link to="/usuarios" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Users className="h-5 w-5 mr-1" />
                      Usuarios
                    </Link>
                    <Link to="/categorias" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Tag className="h-5 w-5 mr-1" />
                      Categorías
                    </Link>
                  </div>
                </div>
        <div>
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cerrar sesión
          </button>
        </div>
       
      </div>
          
      
      </>
  )
}
