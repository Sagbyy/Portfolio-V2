const mongoose = require("mongoose");

module.exports = mongoose.model(
    "Projects",
    new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        link: { type: Array, required: true },
    })
);
