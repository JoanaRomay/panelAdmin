import { Link } from 'react-router-dom'
import { Home, Users, Tag, LogOut } from "lucide-react"

function SideBar() {
  return (
      <>

          <div className="h-[52.2rem] bg-amber-700 w-2xs z-10">
             <div className="pt-10 flex flex-col justify-center items-center">
                    <Link to="/" className="inline-flex pb-3  px-1 pt-1 border-b-2 border-transparent text-white text-xl hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Home className="h-5 w-5 mr-1" />
                      Dashboard
                    </Link>
                    <Link to="/productos" className="inline-flex pb-3  px-1 pt-1 border-b-2 border-transparent text-white text-xl hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Users className="h-5 w-5 mr-1" />
                      Productos
                    </Link>
                     <Link to="/categorias" className="inline-flex pb-3 px-1 pt-1 border-b-2 border-transparent text-white text-xl hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Tag className="h-5 w-5 mr-1" />
                      Categorías
                  </Link>
                                       <Link to="/ordenes" className="inline-flex pb-3 px-1 pt-1 border-b-2 border-transparent text-white text-xl hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Tag className="h-5 w-5 mr-1" />
                      Ordenes
                    </Link>
                  </div>
        </div>
     
      </>
      
      

  )
}

export default SideBar