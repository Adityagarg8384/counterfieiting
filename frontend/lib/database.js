import mongoose from "mongoose";
const MONGO_URI= process.env.MONGO_URI;

const dbconnect = () => {
  mongoose.connect(NEXT_PUBLIC_MONGO_URI)
    .then(() => {
      console.log("Connection has been made successfully");
    })
    .catch((err) => {
      console.error("DB connection failed:", err);
      process.exit(1);
    });
};


export default dbconnect;
// module.exports = dbconnect;
