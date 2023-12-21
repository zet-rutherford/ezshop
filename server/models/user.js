"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasOne(models.Stock, { foreignKey: "user_id" });
			User.hasMany(models.Invoice, { foreignKey: "user_id" });
			User.belongsToMany(models.Customer, {
				through: "user_customer",
				foreignKey: "user_id",
			});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			refreshToken: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
