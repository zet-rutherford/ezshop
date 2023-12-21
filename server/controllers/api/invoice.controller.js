const { Sequelize } = require("sequelize");

const getStockId = require("../../utils/get_stock_id");
const model = require("../../models/index");
const User = model.User;
const Customer = model.Customer;
const Product = model.Product;
const Stock = model.Stock;
const Invoice = model.Invoice;
const Invoice_detail = model.Invoice_detail;

class InvoiceController {
	async createInvoice(req, res) {
		const { customer_id, product_list } = req.body;

		if (!customer_id || !product_list) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		} else {
			try {
				const customer = await User.findOne({
					where: {
						id: req.body.userId,
					},

					attributes: [],

					include: {
						model: Customer,
						where: {
							id: customer_id,
						},
					},
				});

				if (!customer) {
					return res.status(400).json({
						status: "Error",
						message: "Customer is not avaliable",
					});
				}

				const stockId = await getStockId(req.body.userId);

				const orderProducts = [];

				await Promise.all(
					product_list.map(async (product) => {
						const productCheck = await Stock.findOne({
							where: {
								id: stockId,
							},
							attributes: [],
							include: {
								model: Product,
								where: {
									id: product.product_id,
								},
							},
						});

						if (!productCheck) {
							return res.status(400).json({
								status: "Error",
								message: "Product is not avaliable",
							});
						}

						orderProducts.push({
							product: productCheck,
							invoice_quantity: product.quantity,
						});
					})
				);

				let totalPrice = 0;
				const products = [];

				orderProducts.forEach(async (item) => {
					const product = item.product.Products[0];

					if (item.invoice_quantity > product.quantity) {
						return res.status(400).json({
							status: "Error",
							message: `Product with id ${product.id} is not available in sufficient quantity`,
						});
					} else {
						const totalCost = item.invoice_quantity * product.price;
						totalPrice += totalCost;

						products.push({
							id: product.id,
							quantity: item.invoice_quantity,
							totalCost,
						});

						await Product.update(
							{ quantity: Sequelize.literal(`quantity - ${item.invoice_quantity}`) },
							{
								where: {
									id: product.id,
									quantity: {
										[Sequelize.Op.gte]: item.invoice_quantity,
									},
								},
							}
						);
					}
				});

				const user = await User.findByPk(req.body.userId);

				const invoice = await user.createInvoice({
					customer_id: customer_id,
					total_price: totalPrice,
				});

				products.forEach(async (product) => {
					await invoice.createInvoice_detail({
						product_id: product.id,
						quantity: product.quantity,
						price: product.totalCost,
					});
				});

				return res.status(200).json({
					status: "Success",
					message: "Invoice created successfully",
					data: {
						total_price: totalPrice,
						products,
					},
				});
			} catch (e) {
				return res.status(500).json({
					status: "Error",
					message: "Server Internal",
				});
			}
		}
	}

	async getCustomerInvoices(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		} else {
			try {
				const customer = await User.findOne({
					where: {
						id: req.body.userId,
					},

					attributes: [],

					include: {
						model: Customer,
						where: {
							id: id,
						},
					},
				});

				if (!customer) {
					return res.status(400).json({
						status: "Error",
						message: "Customer is not avaliable",
					});
				}

				const invoices = await Customer.findOne({
					where: {
						id: id,
					},

					attributes: [],

					include: {
						model: Invoice,
						attributes: ["id", "total_price"],
					},
				});

				if (!invoices) {
					return res.status(404).json({
						status: "Error",
						message: "Invoice is not avaliable",
					});
				}

				return res.status(200).json({
					status: "Success",
					data: invoices,
				});
			} catch (e) {
				return res.status(500).json({
					status: "Error",
					message: "Server Internal",
				});
			}
		}
	}

	async getCustomerInvoiceDetail(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		} else {
			try {
				const invoice = await Invoice.findByPk(id);

				if (!invoice) {
					return res.status(404).json({
						status: "Error",
						message: "Invoice not avaliable",
					});
				}

				const invoiceDetail = await Invoice_detail.findAll({
					where: {
						invoice_id: id,
					},

					attributes: ["product_id", "quantity", "price"],
				});

				return res.status(200).json({
					status: "Success",
					data: {
						customer_id: invoice.customer_id,
						total_price: invoice.total_price,
						product_list: invoiceDetail,
					},
				});
			} catch (e) {
				return res.status(500).json({
					status: "Error",
					message: "Server Internal",
				});
			}
		}
	}
}

module.exports = new InvoiceController();
