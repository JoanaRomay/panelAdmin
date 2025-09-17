import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import productoService from "../services/productoService";
import categoriaService from "../services/categoriaService";
import {  MoveLeft } from "lucide-react";
function CrearProducto() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    tipoMascota: "",
    idCategoria: "",
    imagen: null,
  });

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await categoriaService.getAll({ page: 1, limit: 100 });
        setCategorias(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error cargando categorías:", err);
        setCategorias([]);
      }
    };
    fetchCategorias();
  }, []);

  const irAtras = () => navigate("/productos");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProducto((prev) => ({
      ...prev,
      imagen: e.target.files[0] || null,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await productoService.create({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      tipoMascota: producto.tipoMascota,
      idCategoria: Number(producto.idCategoria),
      imgUrl: "" // si no hay imagen
    });

    alert("Producto creado correctamente");
    navigate("/productos");
  } catch (err) {
    console.error("Error creando producto:", err);
    alert("No se pudo crear el producto");
  }
};

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 bg-amber-950 p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold leading-none mb-10">
              Crear producto
            </h2>
            <button
              onClick={irAtras}
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              <MoveLeft />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Columna principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Información Básica */}
                <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border mb-10 border-gray-100">
                  <h2 className="text-lg font-semibold">Información Básica</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre del Producto"
                      value={producto.nombre}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      required
                    />
                    <textarea
                      name="descripcion"
                      placeholder="Descripción del producto"
                      value={producto.descripcion}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      rows="4"
                      required
                    />
                    <input
                      type="text"
                      name="tipoMascota"
                      placeholder="Tipo de mascota"
                      value={producto.tipoMascota}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      required
                    />
                  </div>

                </div>

                {/* Precios e Inventario */}
                <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border border-gray-100">
                  <h2 className="text-lg font-semibold">Precios e Inventario</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="number"
                      name="precio"
                      placeholder="Precio ($)"
                      value={producto.precio}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      required
                    />
                    <input
                      type="number"
                      name="stock"
                      placeholder="Stock"
                      value={producto.stock}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-6">
                {/* Categoría */}
                <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border border-gray-100">
                  <h2 className="text-lg font-semibold">Categoría</h2>
                  <select
                    name="idCategoria"
                    value={producto.idCategoria}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {Array.isArray(categorias) &&
                      categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Imagen */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <div className="flex flex-col text-start">
                    <h2>Imagen</h2>
                    <p className="text-sm text-gray-500 pb-3">
                      Sube una imagen para el producto (opcional)
                    </p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imagenUpload"
                    />
                    <label
                      htmlFor="imagenUpload"
                      className="cursor-pointer px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Seleccionar Imagen
                    </label>
                    {producto.imagen && (
                      <p className="text-xs text-gray-500 mt-2">
                        Imagen seleccionada: {producto.imagen.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={irAtras}
                className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
              >
                Crear Producto
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CrearProducto;
