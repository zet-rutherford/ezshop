const getStockId = require("../../utils/get_stock_id");
const model = require("../../models/index");
const Category = model.Category;
const Product = model.Product;
const Stock = model.Stock;

class ProductController {
	async getCategories(req, res) {
		try {
			const categories = await Category.findAll();
			return res.status(200).json({
				status: "Success",
				data: categories,
			});
		} catch (e) {
			return res.status(500).json({
				status: "Error",
				message: "Server Internal",
			});
		}
	}

	async getProducts(req, res) {
		try {
			const stockId = await getStockId(req.body.userId);
			const products = await Stock.findOne({
				where: {
					id: stockId,
				},

				attributes: [],

				include: {
					model: Product,
					attributes: ["id", "name", "price", "quantity", "category_id"],
				},
			});

			return res.status(200).json({
				status: "Success",
				data: products,
			});
		} catch (e) {
			return res.status(500).json({
				status: "Error",
				message: "Server Internal",
			});
		}
	}

	async getProductDetail(req, res) {
		const { id } = req.params;
		const stockId = await getStockId(req.body.userId);

		if (!id) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		}

		try {
			const product = await Stock.findOne({
				where: {
					id: stockId,
				},

				attributes: [],

				include: {
					model: Product,
					where: {
						id: id,
					},
					attributes: ["name", "price", "quantity", "category_id"],
				},
			});

			if (!product) {
				return res.status(404).json({
					status: "Erorr",
					message: "Product not found",
				});
			}

			return res.status(200).json({
				status: "Success",
				data: product,
			});
		} catch (e) {
			return res.status(500).json({
				status: "Error",
				message: "Server Internal",
			});
		}
	}

	async createProduct(req, res) {
		const { name, price, categoryId, quantity } = req.body;
		const stockId = await getStockId(req.body.userId);

		if ((!name, !price, !categoryId)) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		} else {
			try {
				const product = await Stock.findOne({
					where: {
						id: stockId,
					},

					attributes: [],

					include: {
						model: Product,
						where: {
							name: name,
						},
					},
				});

				if (product) {
					return res.status(409).json({
						status: "Erorr",
						message: "Product already exists",
					});
				} else {
					const category = await Category.findOne({
						where: {
							id: categoryId,
						},
					});

					if (!category) {
						return res.status(400).json({
							status: "Error",
							message: "Category Invalid",
						});
					} else {
						const stock = await Stock.findByPk(stockId);

						await stock.createProduct({
							name: name,
							price: price,
							category_id: categoryId,
							quantity: quantity,
						});

						return res.status(200).json({
							status: "Success",
							message: "Product created successfully",
						});
					}
				}
			} catch (e) {
				return res.status(500).json({
					status: "Error",
					message: "Server Internal",
				});
			}
		}
	}

	async storeProduct(req, res) {
		const { id } = req.params;
		const { name, price, categoryId, quantity } = req.body;
		const stockId = await getStockId(req.body.userId);

		if ((!name, !price, !categoryId)) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		} else {
			try {
				const product = await Stock.findOne({
					where: {
						id: stockId,
					},

					attributes: [],

					include: {
						model: Product,
						where: {
							id: id,
						},
					},
				});

				if (!product) {
					return res.status(404).json({
						status: "Erorr",
						message: "Product not found",
					});
				} else {
					const category = await Category.findOne({
						where: {
							id: categoryId,
						},
					});

					if (!category) {
						return res.status(400).json({
							status: "Error",
							message: "Category Invalid",
						});
					} else {
						await Product.update(
							{
								name: name,
								price: price,
								category_id: categoryId,
								quantity: quantity,
							},
							{
								where: {
									id: id,
								},
							}
						);

						return res.status(200).json({
							status: "Success",
							message: "Product updated successfully",
						});
					}
				}
			} catch (e) {
				return res.status(500).json({
					status: "Error",
					message: "Server Internal",
				});
			}
		}
	}

	async deleteProduct(req, res) {
		const { id } = req.params;
		const stockId = await getStockId(req.body.userId);
		if (!id) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		} else {
			try {
				const product = await Stock.findOne({
					where: {
						id: stockId,
					},

					attributes: [],

					include: {
						model: Product,
						where: {
							id: id,
						},
					},
				});

				if (!product) {
					return res.status(404).json({
						status: "Error",
						message: "Product not found",
					});
				} else {
					const productRemove = await Product.findByPk(id);

					await productRemove.removeStock(await Stock.findAll());

					await productRemove.destroy();

					return res.status(200).json({
						status: "Success",
						message: "Product deleted successfully",
					});
				}
			} catch (e) {
				return res.status(500).json({
					status: "Error",
					message: "Server Internal",
				});
			}
		}
	}
}
module.exports = new ProductController();
