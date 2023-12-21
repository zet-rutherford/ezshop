"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user_customer", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "users", //Tên bảng tham chiếu
					},
					key: "id", //Khóa chính của bảng cần tham chiếu
				},
			},
			customer_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "customers", //Tên bảng tham chiếu
					},
					key: "id", //Khóa chính của bảng cần tham chiếu
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("user_customer");
	},
};
