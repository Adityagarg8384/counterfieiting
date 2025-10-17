const express = require("express");
const app = express();
const dbconnect = require("./config/database");
const cors = require("cors");
const router = require("./router/routes");
const cookieParser = require("cookie-parser");
const { db } = require("./models/models");

app.use(express.json());
app.use(cors()); 
app.use(cookieParser());

app.use("/", router);

async function connect() {
  try {
    await dbconnect();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

connect();