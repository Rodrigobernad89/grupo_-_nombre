const{sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const extra = sequelize.define('Extra', {
         name: DataTypes.STRING,
         price:DataTypes.DECIMAL,
         active:DataTypes.BOOLEAN,
     } )

     extra.associate = models => {
         extra.hasMany(models.Item, {
            as: "items",
            foreignKey: "extras_id",
        });
     }

     return extra;
 }