import mongoose from "mongoose";
import environment from "../environment";
const dbName: string = environment.dbName;
console.log("ENV => ", environment.nodeEnv);
const dbUri: string = environment.dbUri;
mongoose
  .connect(dbUri, { dbName })
  .then(() => {
    console.log("Mongodb connected....", dbUri);
  })
  .catch((err) => console.log(err.message));

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected to db...", dbUri);
});

db.on("error", (err) => {
  console.log(err.message);
});

db.on("disconnected", () => {
  console.log("Mongoose connection is disconnected...", dbUri);
});
