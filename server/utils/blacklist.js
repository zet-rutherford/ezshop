const model = require("../models/index");
const jwt = require("./jwt");
const BlackList = model.BlackList;

module.exports = {
	remove: async () => {
		const blacklist = await BlackList.findAll({
			attributes: ["id", "accessToken"],
		});

		if (blacklist) {
			blacklist.forEach((item) => {
				try {
					jwt.decode(item.dataValues.accessToken);
				} catch (e) {
					item.destroy();
				}
			});
		}
	},
};
