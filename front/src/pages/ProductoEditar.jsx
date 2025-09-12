import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import productoService from "../services/productoService";
import categoriaService from "../services/categoriaService";

function ProductoEditar() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: "",
    estado: "Activo",
    imagen: null,
    imgUrl: "", // <-- guardamos la imagen actual de la BD
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

  // Cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await productoService.getAll({ page: 1, limit: 100 });
        setProductos(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setProductos([]);
      }
    };
    fetchProductos();
  }, []);

  const irAtras = () => navigate("/productos");

  // Al seleccionar un producto
  const handleSelectProducto = (e) => {
    const selectedId = e.target.value;
    const prod = productos.find((p) => p.id === parseInt(selectedId));
    if (prod) {
      setProducto({
        id: prod.id,
        nombre: prod.nombre,
        descripcion: prod.descripcion,
        precio: prod.precio,
        stock: prod.stock,
        categoriaId: prod.idCategoria,
        estado: "Activo",
        imagen: null,       // no se ha seleccionado nueva imagen
        imgUrl: prod.imgUrl, // <-- conservamos la imagen de la BD
      });
    }
  };

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
    const dataToUpdate = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      idCategoria: Number(producto.categoriaId),
      estado: producto.estado,
    };

    // Solo actualizar imgUrl si subieron una nueva imagen
    if (producto.imagen) {
      dataToUpdate.imgUrl = producto.imagen; // si manejas file upload
    } else if (producto.imgUrl) {
      dataToUpdate.imgUrl = producto.imgUrl; // mantener la actual
    }

    await productoService.update(producto.id, dataToUpdate);

    alert("Producto actualizado correctamente");
    navigate("/productos");
  } catch (err) {
    console.error("Error actualizando producto:", err);
    alert("No se pudo actualizar el producto");
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
              Editar producto
            </h2>
            <button
              onClick={irAtras}
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              Atrás
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Columna principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Seleccionar Producto */}
                <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border mb-10 border-gray-100">
                  <h2 className="text-lg font-semibold">Seleccionar Producto</h2>
                  <select
                    value={producto.id}
                    onChange={handleSelectProducto}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  >
                    <option value="">Seleccionar producto</option>
                    {Array.isArray(productos) &&
                      categorias.map((cat) => (
                        <optgroup key={cat.id} label={cat.nombre}>
                          {productos
                            .filter((p) => p.idCategoria === cat.id)
                            .map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.nombre}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                  </select>

                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del Producto"
                    value={producto.nombre}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  />
                  <textarea
                    name="descripcion"
                    placeholder="Descripción del producto"
                    value={producto.descripcion}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    rows="4"
                  />
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
                    />
                    <input
                      type="number"
                      name="stock"
                      placeholder="Stock"
                      value={producto.stock}
                      onChange={handleChange}
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
                  <select
                    name="categoriaId"
                    value={producto.categoriaId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  >
                    <option value="">Seleccionar categoría</option>
                    {Array.isArray(categorias) &&
                      categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                  </select>

                  <select
                    name="estado"
                    value={producto.estado}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Borrador">Borrador</option>
                    <option value="Inactivo">Inactivo</option>
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
                    {producto.imagen ? (
                      <p className="text-xs text-gray-500 mt-2">
                        Imagen seleccionada: {producto.imagen.name}
                      </p>
                    ) : producto.imgUrl ? (
                      <p className="text-xs text-gray-500 mt-2">
                        Imagen actual: {producto.imgUrl}
                      </p>
                    ) : null}
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
                Guardar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ProductoEditar;
