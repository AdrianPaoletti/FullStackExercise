const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("fullStackExercise:server");
const {
  notFoundErrorHandler,
  generalErrorHandler,
} = require("./middlewares/error");
const musicRoutes = require("./routes/musicRoutes");

const app = express();

app.use(cors());

const initilizeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Listening on port ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("An error with the server occurred"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is in use`));
      }
      reject();
    });

    server.on("close", () => {
      debug(chalk.yellow("Server disconnected."));
    });
  });

app.use(morgan("dev"));
app.use(express.json());

app.use("/music", musicRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { initilizeServer, app };
