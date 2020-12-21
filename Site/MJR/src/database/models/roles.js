const{sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   const Rol = sequelize.define('Role', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        created_at:DataTypes.DATE,
        updated_at:DataTypes.DATE,
    } );
    Rol.associate = models=>{
        Rol.belongsToMany(models.User,{
          through:'users_roles',
          as:'users'
        })
        Rol.belongsToMany(models.Profile,{
          through:'roles_profiles',
          as:'profiles'
        })
    }

    return Rol;
}