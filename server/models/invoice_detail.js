"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Invoice_detail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Invoice_detail.belongsTo(models.Product, { foreignKey: "product_id" });
			Invoice_detail.belongsTo(models.Invoice, { foreignKey: "invoice_id" });
		}
	}
	Invoice_detail.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			invoice_id: DataTypes.INTEGER,
			product_id: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Invoice_detail",
		}
	);
	return Invoice_detail;
};
