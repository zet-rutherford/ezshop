const model = require("../../models/index");
const User = model.User;
const Customer = model.Customer;
const Invoice = model.Invoice;

class CustomerController {
	async getUserDetail(req, res) {
		const id = req.body.userId;
		try {
			const userDetail = await User.findOne({
				where: {
					id: id,
				},

				attributes: ["name", "email"],
			});
			return res.status(200).json({
				status: "Success",
				data: userDetail,
			});
		} catch (e) {
			return res.status(401).json({
				status: "Error",
				error: "Authorization Failed",
			});
		}
	}

	async getCustomers(req, res) {
		try {
			const customers = await User.findOne({
				where: {
					id: req.body.userId,
				},

				attributes: [],

				include: {
					model: Customer,
					attributes: ["id", "name", "phone"],
				},
			});

			res.status(200).json({
				status: "Success",
				data: customers,
			});
		} catch (e) {
			return res.status(500).json({
				status: "Error",
				message: "Server Internal",
			});
		}
	}

	async createCustomer(req, res) {
		const { name, phone } = req.body;

		if (!name || !phone) {
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
							phone: phone,
						},
						attributes: ["name", "phone"],
					},
				});

				if (customer) {
					return res.status(409).json({
						status: "Erorr",
						message: "Customer already exists",
					});
				} else {
					const customerData = {
						name: name,
						phone: phone,
					};
					const user = await User.findByPk(req.body.userId);

					const newCustomer = await user.createCustomer(customerData);
					return res.status(201).json({
						status: "Success",
						message: "Customer created successfully",
						data: newCustomer,
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

	async storeCustomer(req, res) {
		const { id } = req.params;
		const { name, phone } = req.body;

		if (!name || !phone || !id) {
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
						attributes: ["name", "phone"],
					},
				});

				if (!customer) {
					return res.status(404).json({
						status: "Error",
						message: "Customer not found",
					});
				} else {
					await Customer.update(
						{
							name: name,
							phone: phone,
						},
						{
							where: {
								id: id,
							},
						}
					);
					return res.status(201).json({
						status: "Success",
						message: "Customer updated successfully",
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

	async deleteCustomer(req, res) {
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
					return res.status(404).json({
						status: "Error",
						message: "Customer not found",
					});
				} else {
					const customerRemove = await Customer.findByPk(id);

					await customerRemove.removeUser(await User.findAll());

					await customerRemove.removeInvoice(await Invoice.findAll());

					await customerRemove.destroy();

					return res.status(200).json({
						status: "Success",
						message: "Customer deleted successfully",
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

	async checkAvalibleCustomer(req, res) {
		const { phone } = req.body;

		if (!phone) {
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
							phone: phone,
						},
						attributes: ["name", "phone"],
					},
				});
				if (!customer) {
					return res.status(200).json({
						status: "Not found",
						message: "Customer not found",
					});
				} else {
					return res.status(200).json({
						status: "Success",
						message: "Customer exists",
						data: customer,
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

module.exports = new CustomerController();
