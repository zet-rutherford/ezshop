"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Customer extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Customer.belongsToMany(models.User, {
				through: "user_customer",
				foreignKey: "customer_id",
			});

			Customer.hasMany(models.Invoice, { foreignKey: "customer_id" });
		}
	}
	Customer.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: DataTypes.STRING,
			phone: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Customer",
		}
	);
	return Customer;
};
