require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const PORT = process.env.SERVER_PORT || 5000;

const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // 100 requests per 10 minutes
});

// Middleware
app.use(cors());
app.use(limiter);

app.set("trust proxy", 1);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Routes
app.use("/api", require("./routes"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
