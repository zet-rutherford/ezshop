const bcrypt = require("bcrypt");

const ValidateMiddleware = require("../../middlewares/validate.middleware");
const model = require("../../models/index");
const User = model.User;
const Stock = model.Stock;

const saltRounds = +process.env.HASH_SALT_ROUND;

class RegisterController {
	async register(req, res) {
		const { name, email, password } = req.body;
		const checkValidate = ValidateMiddleware.userValidate(name, email, password);
		if (
			!checkValidate.nameValidator ||
			!checkValidate.emailValidator ||
			!checkValidate.passwordValidator
		) {
			return res.status(400).json({
				status: "Error",
				message: "Missing or invalid information",
			});
		}
		try {
			const user = await User.findOne({
				where: {
					email,
				},
			});

			if (user) {
				return res.status(409).json({
					status: "Error",
					message: "Email is available",
				});
			}

			const hashPassword = bcrypt.hashSync(password, saltRounds);

			const newUser = await User.create({
				name: name,
				email: email,
				password: hashPassword,
			});

			await newUser.createStock({ name: `${name}_stock` });

			res.status(201).json({
				stautus: "Success",
				data: newUser,
			});
		} catch (error) {
			return res.status(500).json({
				status: "Error",
				error,
			});
		}
	}
}

module.exports = new RegisterController();
