class RequestLimitMiddleware {
	requestLimt(req, res, next) {
		const maxRequest = 1000;
		const timeLimit = 60000;

		const currentTime = Date.now();
		const requestsWithinLimit = req.app.locals.requestsWithinLimit || [];

		const recentRequest = requestsWithinLimit.filter(
			(request) => currentTime - request.timestamp <= timeLimit
		);

		if (recentRequest.length >= maxRequest) {
			return res.status(429).json({
				status: "Error",
				message: "Too many requests within the allowed time period.",
			});
		}

		requestsWithinLimit.push({ timestamp: currentTime });
		req.app.locals.requestsWithinLimit = requestsWithinLimit;

		next();
	}
}

module.exports = new RequestLimitMiddleware();
