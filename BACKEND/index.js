require("dotenv").config();
const { initilizeServer } = require("./server/index");

const port = process.env.SERVER_PORT ?? 3001;

try {
  initilizeServer(port);
} catch (error) {
  process.exit(1);
}
