const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const skillRoutes = require("./routes/skills");
const projectRoutes = require("./routes/projects");
const cors = require("cors");
const path = require("path");
const aws = require("aws-sdk")

const app = express();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connection à mongoDB réussie !"))
    .catch(() => console.log("Connection à mongoDB échouchéé ! "));

app.use(express.json());

// Cors
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders:
            "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization",
    })
);
app.options("*", cors());

// AWS S3
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

app.use("/api/user", userRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/project", projectRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
