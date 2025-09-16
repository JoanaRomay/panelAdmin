import { Link } from 'react-router-dom'
import { Home, Users, Tag, LogOut } from "lucide-react"

export default function NavBar() {
  return (
      <>
      <div className="h-20 bg-amber-200 flex items-center justify-between pl-14 pr-14">
              <h1 className="font-bold text-xl ">Panel de Administración</h1>  
           
        <div>
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cerrar sesión
          </button>
        </div>
       
      </div>
          
      
      </>
  )
}
