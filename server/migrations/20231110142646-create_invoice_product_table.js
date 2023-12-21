"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("invoice_product", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			invoice_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "invoices", //Tên bảng tham chiếu
					},
					key: "id", //Khóa chính của bảng cần tham chiếu
				},
			},
			product_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "products", //Tên bảng tham chiếu
					},
					key: "id", //Khóa chính của bảng cần tham chiếu
				},
			},
			quantity: {
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
		await queryInterface.dropTable("user_customer");
	},
};
