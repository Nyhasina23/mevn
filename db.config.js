const mongoose = require("mongoose");

async function connectDatabase() {
  mongoose
    .connect("mongodb://localhost:27017/Usermevn-js", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB database connected...");
    })
    .catch((err) => {
      console.log("Error to connect mongo database " + err);
    });
}

module.exports = connectDatabase;
