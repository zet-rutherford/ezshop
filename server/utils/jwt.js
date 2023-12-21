const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const accessTokenAviliableTime = process.env.JWT_ACCESSTOKEN_AVALIABLE_TIME;
const refreshTokenAviliableTime = process.env.JWT_REFRESHTOKEN_AVALIABLE_TIME;

class JwtToken {
	createAccessToken(data) {
		const token = jwt.sign({ data }, jwtSecretKey, {
			expiresIn: accessTokenAviliableTime * 60,
		});

		return token;
	}

	createRefreshToken() {
		const token = jwt.sign(
			{
				data: {
					number: Math.random() + new Date().getTime(),
				},
			},
			jwtSecretKey,
			{ expiresIn: refreshTokenAviliableTime * 60 }
		);
		return token;
	}

	decode(token) {
		try {
			const decode = jwt.verify(token, jwtSecretKey);
			return decode.data;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = new JwtToken();
