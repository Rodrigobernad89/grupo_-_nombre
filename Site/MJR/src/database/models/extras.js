const{sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const extra = sequelize.define('Extra', {
         name: DataTypes.STRING,
         price:DataTypes.DECIMAL,
         active:DataTypes.BOOLEAN,
     } )
     return extra;
 }