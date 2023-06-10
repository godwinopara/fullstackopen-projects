const app = require("./app");
const logger = require("./utils.js/logger");
const config = require("./utils.js/config");

const PORT = config.PORT;
app.listen(PORT, () => logger.info(`running on port ${config.PORT}`));
