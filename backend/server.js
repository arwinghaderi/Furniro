const { default: mongoose } = require("mongoose");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT;

function startServer() {
  app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
  });
}

function dbConnection() {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log(`Mongo Db Connected Successfully`);
    })
    .catch((err) => {
      console.log(`Err in Db Connection ->`, err);
      process.exit(1);
    });
}

function run() {
  startServer();
  dbConnection();
}

run();
