"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class BlackList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	BlackList.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			accessToken: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "BlackList",
		}
	);
	return BlackList;
};
