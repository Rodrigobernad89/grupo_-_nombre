const{sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   const Rol = sequelize.define('Role', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        
    } )
    Rol.associate = models=>{
        Rol.belongsToMany(models.User,{
          through:'users_roles',
          as:'users'
 
        })
    }

    return Rol;
}