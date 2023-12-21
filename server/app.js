require("dotenv").config();
require("./schedules/clean_blacklist");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const authMiddleware = require("./middlewares/auth.middleware");
const RequestLimitMiddleware = require("./middlewares/request.limit.middleware");

const authRouter = require("./routes/auth");
const customerRouter = require("./routes/customer");
const invoiceRouter = require("./routes/invoice");
const productRouter = require("./routes/product");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(RequestLimitMiddleware.requestLimt);

app.use("/auth", authRouter);

app.use(authMiddleware.verifyToken);

app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/invoice", invoiceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
