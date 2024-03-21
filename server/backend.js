const express = require("express");
const app = express();
const dbconnect = require("./config/database");
const cors = require("cors");
const router = require("./router/routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors()); 
app.use(cookieParser());

app.use("/", router);

app.listen(8000, () => {
    console.log("Port started successfully at Port 8000");
});

dbconnect();
