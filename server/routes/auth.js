const express = require("express");
const router = express.Router();

const RegisterController = require("../controllers/auth/register.controller");
const LoginController = require("../controllers/auth/login.controller");

router.post("/register", RegisterController.register);
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);
router.get("/get-token", LoginController.getRefreshToken);
module.exports = router;
