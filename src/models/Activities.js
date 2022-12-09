const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Activities', {
    // la columna image viene x relacion
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull:false,
    },
    schedule: {
      type: DataTypes.STRING
    },
    start_at: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end_at:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    allowed_age: {
      type: DataTypes.ENUM("todo público", "hasta 13 años","adolescentes", "mayores de 18 años"),
      allowNull: false
    },
    difficulty_level: {
      type: DataTypes.ENUM("niños", "principiantes", "intermedio", "dificil", "extremo"),
      allowNull: false
    },
    disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

};
