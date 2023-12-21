"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Invoice extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Invoice.belongsTo(models.User, { foreignKey: "user_id" });
			Invoice.belongsTo(models.Customer, { foreignKey: "customer_id" });
			Invoice.hasMany(models.Invoice_detail, { foreignKey: "invoice_id" });
		}
	}
	Invoice.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: DataTypes.INTEGER,
			customer_id: DataTypes.INTEGER,
			total_price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Invoice",
		}
	);
	return Invoice;
};
