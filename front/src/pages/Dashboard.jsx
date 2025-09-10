import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"

function Dashboard() {
  return (
        <div className=" flex flex-col">
            <NavBar />

        <div className="flex flex-1">
            <SideBar />

        <main className="flex-1 bg-amber-950 pl-10 pt-6 ">
                  <h2 className="text-white text-3xl font-bold mb-4 pb-5">Dashboard</h2>
                  <div className="flex p">
                    <div className="h-56 w-56 bg-amber-50  mr-10 rounded-xl">Total de productos</div>
                    <div className="h-56 w-56 bg-amber-50  mr-10 rounded-xl">Pedidos hoy</div>
                    <div className="h-56 w-56 bg-amber-50  mr-10 rounded-xl">Pendientes</div>
                    <div className="h-56 w-56 bg-amber-50 rounded-xl">Ventas hoy</div> 
                  </div>
                  <div className="h-40 w-[50rem] bg-amber-50 rounded-xl mt-10">
                      <h3 className="pt-5 pl-5 text-xl font-bold">Acciones rápidas</h3>
                      <div className="flex items-center justify-between mt-5">
                          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 w-[23rem] rounded-lg  ml-5">
                                + Nuevo Producto
                          </button>
                          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 w-[23rem] rounded-lg  mr-5">
                                Ver Pedidos
                          </button>
                          
                   
                      </div>
                    
                  </div>
                  
        </main>
      </div>
    </div>
  )
}

export default Dashboard
