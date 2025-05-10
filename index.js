require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/event");
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", eventRoutes);  // Use OTP routes from event.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
