const debug = require("debug")("fullStackExercise:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Page not found" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  debug(chalk.red(`Error message: ${error.message}`));
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Sorry, bad request";
  }
  const message = error.code ? error.message : "General Error";
  res.status(error.code || 500).json({ error: message });
};

module.exports = { notFoundErrorHandler, generalErrorHandler };
