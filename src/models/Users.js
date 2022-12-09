const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Users', {
    // ver UUID, UUIDV1, UUIDV4

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING, // que sea primera letra del nombre y el apellido, que lo genere directamente el front
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      type: DataTypes.STRING, // usar DATEONLY
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      // validar que contengan @ + "" + ".com"
      type: DataTypes.STRING,
      allowNull: false
    },
    id_type: {
      type: DataTypes.ENUM("Passport", "Nationality ID"),
      allowNull: false

    },
    id_number: {
      type: DataTypes.BIGINT, // aclarar en front que se ingresen solo numeros, sin puntos, ni guiones, ni nada
      allowNull: false
    },
    language: {
      type: DataTypes.ENUM("spanish", "english") // de poder, automatizar el lenguaje de la pag segun el idioma que elija por preferencia
    },
    disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  });
  // no tocar los timestamps
};
