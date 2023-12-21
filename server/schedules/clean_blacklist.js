const cron = require("node-cron");
const blacklist = require("../utils/blacklist");

cron.schedule("0 0 * * *", () => {
	blacklist.remove();
});
