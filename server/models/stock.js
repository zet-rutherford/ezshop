"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Stock.belongsTo(models.User, { foreignKey: "user_id" });
			Stock.belongsToMany(models.Product, {
				through: "product_stock",
				foreignKey: "stock_id",
			});
		}
	}
	Stock.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: DataTypes.STRING,
			user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Stock",
		}
	);
	return Stock;
};
