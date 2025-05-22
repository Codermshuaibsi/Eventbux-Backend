const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const connectDB = require("../config/db");
const eventRoutes = require("../routes/event");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", eventRoutes);

module.exports.handler = serverless(app);
