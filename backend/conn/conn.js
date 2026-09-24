require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env")
});

const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    });