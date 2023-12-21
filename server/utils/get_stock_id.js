const model = require("../models/index");
const User = model.User;
const Stock = model.Stock;

const getStockId = async (userId) => {
	const stock = await User.findOne({
		where: {
			id: userId,
		},

		attributes: [],

		include: Stock,
	});

	return stock.dataValues.Stock.dataValues.id;
};

module.exports = getStockId;
