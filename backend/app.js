const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const path = require("path");
const User = require("./models/User");
const { userInfo } = require("os");

const app = express();

// Connect to MongoDB
mongoose
    .connect(
        process.env.MONGO_DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connection à mongoDB réussie !"))
    .catch(() => console.log("Connection à mongoDB échouchéé ! "));

app.use(express.json());

// Cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);


// app.use("/api/stuff", stuffRoutes);
// app.use("/api/auth", userRoutes);
// app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
