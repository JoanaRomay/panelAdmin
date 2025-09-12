import sequelize from '../db/connection.js';

import Producto from './Producto.js';
import Categoria from './Categoria.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';

import Orden from './Orden.js';
import DetalleOrden from './DetalleOrden.js';

// Producto pertenece a Categoria
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });

// Categoria tiene muchos productos
Categoria.hasMany(Producto, { foreignKey: 'idCategoria', as: 'productos' });

// Usuario pertenece a Rol
Usuario.belongsTo(Rol, { foreignKey: "rolId" });
Rol.hasMany(Usuario, { foreignKey: "rolId" });

export {
  sequelize,
  Categoria,
  Producto,
  Usuario,
  Rol,
  Orden,
  DetalleOrden,
};
