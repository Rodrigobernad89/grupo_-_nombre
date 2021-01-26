const{sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('Product', {
         name: DataTypes.STRING,
         description: DataTypes.TEXT,
         instructions: DataTypes.TEXT,
         price:DataTypes.DECIMAL,
         image:DataTypes.STRING,
         stock:DataTypes.INTEGER
     } )
     product.associate = models=>{
        product.hasMany(models.Item, {
            as: "items",
            foreignKey: "product_id",
        });
     }

     return product;


 }