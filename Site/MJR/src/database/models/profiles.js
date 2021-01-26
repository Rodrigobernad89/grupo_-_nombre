const{sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   const Profile = sequelize.define('Profile', {
        name: DataTypes.STRING,
        description: DataTypes.STRING ,
        created_at:DataTypes.DATE,
        updated_at:DataTypes.DATE,
        link: DataTypes.STRING ,
    } );
    Profile.associate = models=>{
      Profile.belongsToMany(models.Role,{
        through:'roles_profiles',
        as:'roles'

      })
  }
    return Profile;
}