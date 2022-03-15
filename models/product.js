'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      Product.hasMany(models.Cart, {
        foreignKey: 'productId',
      });
    }
  }
  Product.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
          as: 'categoryId',
        },
      },
      productName: DataTypes.STRING,
      description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
