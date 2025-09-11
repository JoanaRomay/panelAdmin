import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipoMascota: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaCreacion: {
    type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    
    },
    oferta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
            validate: {
                min: 0,
                max: 100
            }
    },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias',
      key: 'id'
    }
  }
}, {
  tableName: 'productos',
  timestamps: false
});

export default Producto;
