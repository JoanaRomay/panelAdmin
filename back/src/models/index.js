import sequelize from '../db/connection.js';

import Producto from './Producto.js';
import Categoria from './Categoria.js';

import Orden from './Orden.js';
import DetalleOrden from './DetalleOrden.js';

// Producto pertenece a Categoria
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });

// Categoria tiene muchos productos
Categoria.hasMany(Producto, { foreignKey: 'idCategoria', as: 'productos' });



    


export {
  sequelize,
  
  Categoria,
  Producto,
  Orden,
  DetalleOrden,

};
