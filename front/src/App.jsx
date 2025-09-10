import { BrowserRouter, Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import Productos from "./pages/Productos"
import CrearProducto from "./pages/CrearProducto"

function App() {
  
  return (
    <>
          <BrowserRouter>
            <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route path="/productos/crearProducto" element={<CrearProducto/>}/>
            </Routes>
          
          </BrowserRouter>
    </>
  )
}

export default App
