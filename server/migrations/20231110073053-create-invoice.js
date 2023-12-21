"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Invoices", {
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
				allowNull: true,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "customers", //Tên bảng tham chiếu
					},
					key: "id", //Khóa chính của bảng cần tham chiếu
				},
			},
			total_price: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Invoices");
	},
};
