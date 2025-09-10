import { BrowserRouter, Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import Productos from "./pages/Productos"


function App() {
  
  return (
    <>
          <BrowserRouter>
            <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/productos" element={<Productos/>}/>
            </Routes>
          
          </BrowserRouter>
    </>
  )
}

export default App
