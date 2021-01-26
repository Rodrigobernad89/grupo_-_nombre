 module.exports = function (sequelize, dataTypes) {
    let alias = "Cart";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        deleted_at: {
            type: dataTypes.DATE,
            defaultValue: null,
            allowNull: true
        },
        purchased_at: {
            type: dataTypes.DATE,
            defaultValue: null,
            allowNull: true
        }
    }
    
   // let config = {
   //     tableName: "carts",
   //     timestamps: false
   // }
    
    let Cart = sequelize.define(alias, cols);
    
    Cart.associate = function (models){
        Cart.hasMany(models.Item, {
            as: "items",
            foreignKey: "cart_id",
          });
          Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
          });
    
    }   
    
    return Cart;
}




