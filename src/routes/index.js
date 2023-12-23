const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");

// Env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Initialize cache
let cache = apicache.middleware;

// Routes
router.get(
    "/",
    cache(process.env.CACHE_TIME || "2 minutes"),
    async (req, res) => {
        try {
            const params = new URLSearchParams({
                [API_KEY_NAME]: API_KEY_VALUE,
                ...url.parse(req.url, true).query,
            });

            const apiResponse = await needle(
                "get",
                `${API_BASE_URL}?${params}`
            );
            let data = apiResponse.body;

            // Log the request to the public api
            if (process.env.NODE_ENV !== "production") {
                console.log(`REQUEST: ${API_BASE_URL}?${params}`);
            }

            // Get icon and set icon
            const icon = data.weather[0].icon;
            data.iconurl = `http://openweathermap.org/img/w/${icon}.png`;
            data.weather[0].icon = data.iconurl;

            // Return data to the client
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
);

module.exports = router;
