"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Categories", [
			{
				name: "Thực Phẩm Tươi",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Thực Phẩm Đóng Gói và Đóng Hộp",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Thực Phẩm Đóng Gói",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Đồ Uống",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Hàng Gia Dụng",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Đồ Chăm Sóc Cá Nhân",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Dụng Cụ Nấu Ăn",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Sản Phẩm Vệ Sinh Cá Nhân",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Đồ Chơi và Vật Dụng Giải Trí",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Categories", null, {});
	},
};
