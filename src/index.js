//   _____                    _    _____                 _
//  |  __ \                  | |  / ____|               (_)
//  | |__) |_ _ ___  ___ __ _| | | (___   ___ _ ____   ___  ___ ___  ___
//  |  ___/ _` / __|/ __/ _` | |  \___ \ / _ \ '__\ \ / / |/ __/ _ \/ __|
//  | |  | (_| \__ \ (_| (_| | |  ____) |  __/ |   \ V /| | (_|  __/\__ \
//  |_|   \__,_|___/\___\__,_|_| |_____/ \___|_|    \_/ |_|\___\___||___/

// Project made by: Pascal Wiersma - pascal@psww.nl
// If you have any questions, feel free to contact me.

require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const PORT = process.env.SERVER_PORT || 5000;

const app = express();

const limiter = rateLimit({
    windowMs: process.env.WINDOW_MS || 10 * 60 * 1000, // 10 minutes by default
    max: process.env.MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs by default
});

// Middleware
app.use(cors());
app.use(limiter);

// Trust proxy for rate limiter
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
app.listen(PORT, () =>
    console.log(
        `---------------- Server started on port ${PORT} ----------------`,
        `\nRate limiter: ${process.env.MAX_REQUESTS} requests per ${
            process.env.WINDOW_MS / 1000
        } seconds.`,
        `\nOpen http://localhost:${PORT} to view the app.`,
        `\n--------------------------------------------------------------`,
        `\n\n`,
        `Project made by: Pascal Wiersma - https://github.com/Pascal-Services/weather`
    )
);
