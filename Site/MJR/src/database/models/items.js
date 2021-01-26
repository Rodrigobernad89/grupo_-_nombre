module.exports = function (sequelize, dataTypes) {
    let alias = "Item";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }, 

        extras_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },

        qty: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        deleted_at:{
            type: dataTypes.DATE,
            allowNull: true
        }

    };
    

    //Esto lo coloco en comentarios ya que poseo mi base de datos sequelizada
    //let config = {
    //    tableName: "cartProduct",
    //    timestamps: false
    //}
    
    let Item = sequelize.define(alias, cols, {timestamps:false});
    
    Item.associate = models => {
        Item.belongsTo(models.Cart, {
            foreignKey: "cart_id",
            as: "cart",
          });

        Item.belongsTo(models.Product, {
            foreignKey: "product_id",
            as: "product",
        });

        Item.belongsTo(models.Extra, {
            foreignKey: "extras_id",
            as: "extra",
        });
    
    }
    
    return Item;
}