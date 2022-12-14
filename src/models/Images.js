const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Images', {
    name: {
      type: DataTypes.STRING,
      // unique: true,
      // allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
    },
    public_id: {
      type: DataTypes.STRING,
      require: true
    },
    url: {
      type: DataTypes.STRING,
      required: true
    },
    posted: {
      // cuando creamos la actividad o el producto . Images.upload(podes: true)
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    for: {
      type: DataTypes.ENUM("Activities", "Products", "Users_Profile", "Various"),
      defaultValue: "Various" 
    },
    disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      // de ser true pedir especificaciones
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
    // tendria relacion 1 prod : 1 foto (puede tener mas)
    // relacion 1 actividad : M fotos (la idea es que todas las actividades tengan fotos distintas y que no se repitan)
  });
};