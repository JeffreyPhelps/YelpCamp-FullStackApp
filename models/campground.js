


const mongoose = require("mongoose");


// DATABASE SCHEMA

// Mongo Schema Setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Compiling schema into a model, connecting schema to reference name, and exporting to app.js
module.exports = mongoose.model("Campground", campgroundSchema);







