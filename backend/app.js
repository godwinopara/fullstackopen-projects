const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const phoneBookRouter = require("./controllers/phonebook");
const config = require("./utils.js/config");
const logger = require("./utils.js/logger");
const middleware = require("./utils.js/middleware");

const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message);
	});

app.use(cors());
app.use(express.json());
app.use(morgan("common"));
// app.use(express.static("build"));
app.use(middleware.requestLogger);

// REQUEST

app.get("/", function (request, response) {
	response.send("welcome");
});

// ROUTER
app.use("/api", phoneBookRouter);

// MIDDLEWARES

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
