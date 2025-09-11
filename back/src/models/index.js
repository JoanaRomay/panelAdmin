import sequelize from '../db/connection.js';

import Producto from './Producto.js';
import Categoria from './Categoria.js';

import Orden from './Orden.js';
import DetalleOrden from './DetalleOrden.js';

// Producto - Categoria 1:N
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' });
Categoria.hasMany(Producto, { foreignKey: 'idCategoria' });


    


export {
  sequelize,
  
  Categoria,
  Producto,
  Orden,
  DetalleOrden,

};
