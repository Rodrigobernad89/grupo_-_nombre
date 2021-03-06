const{sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   const user = sequelize.define('User', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password:DataTypes.STRING,
        image:DataTypes.STRING
    } )
    user.associate = models=>{
        user.belongsToMany(models.Role,{
          through:'users_roles',
          as:'roles'
        });
        // associate with carts
        user.hasMany(models.Cart, {
          foreignKey: "user_id",
          as: "carts",
        });
      }  
      return user;
    }