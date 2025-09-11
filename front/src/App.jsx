import { BrowserRouter, Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import Productos from "./pages/Productos"
import CrearProducto from "./pages/CrearProducto"
import Categorias from "./pages/Categorias"
import NuevaCategoria from "./pages/NuevaCategoria"
import Ordenes from "./pages/Ordenes"

function App() {
  
  return (
    <>
          <BrowserRouter>
            <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route path="/productos/crearProducto" element={<CrearProducto />} />
                  <Route path="/crearProducto/productos" element={<Productos />} />
                  <Route path="/categorias" element={<Categorias />} />
                  <Route path="/categorias/nuevaCategoria" element={<NuevaCategoria />} />
                  <Route path="/ordenes" element={<Ordenes/>}/>
                  
            </Routes>
          
          </BrowserRouter>
    </>
  )
}

export default App
