const jwt = require("../utils/jwt");

const model = require("../models/index");
const User = model.User;
const BlackList = model.BlackList;

class AuthMiddleware {
	async verifyToken(req, res, next) {
		const authorization = req.headers["authorization"];

		try {
			const token = authorization.replace("Bearer", "").trim();

			const logoutToken = await BlackList.findOne({
				where: {
					accessToken: token,
				},
			});

			if (logoutToken) {
				return res.status(401).json({
					status: "Error",
					message: "Authorization Failed",
				});
			} else {
				const decoded = jwt.decode(token);
				const { userId } = decoded;
				const user = await User.findByPk(userId);
				if (!user) {
					return res.status(401).json({
						status: "Error",
						message: "Authorization Failed",
					});
				} else {
					req.body.userId = userId;
					next();
				}
			}
		} catch (error) {
			res.status(403).json({
				status: "Error",
				message: "Authentication Failed",
			});
		}
	}
}

module.exports = new AuthMiddleware();
