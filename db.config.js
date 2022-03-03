const mongoose = require("mongoose");

async function connectDatabase() {
  mongoose
    .connect("mongodb+srv://nyhasina23:Nyhasina230598@cluster0.ffn8i.mongodb.net/test?authSource=admin&replicaSet=atlas-bkmor3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
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
