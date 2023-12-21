"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.Category, { foreignKey: "category_id" });
			Product.hasMany(models.Invoice_detail, { foreignKey: "product_id" });
			Product.belongsToMany(models.Stock, {
				through: "product_stock",
				foreignKey: "product_id",
			});
		}
	}
	Product.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: DataTypes.STRING,
			price: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			category_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
