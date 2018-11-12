// Jeffrey Phelps 2018




// PACKAGES

// Initializing Express.js NPM package
const express = require("express");
const app = express();

// Initializing body-parser NPM package
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Initializing Mongoose NPM package and setting the Mongo database name, "yelpcampdb"
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelpcampdb", {useNewUrlParser: true}); // Optional {useNewUrlParser: true} object for Amazon c9.io to clear future error warning




// DATABASE SCHEMA

// Mongo Schema Setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Compiling schema into a model, connecting schema to reference name
const Campground = mongoose.model("Campground", campgroundSchema);





// HTTP ROUTES

// Homepage Route
app.get("/", function(req, res){ // Using express to create HTTP route, with required callback
    res.render("index.ejs"); // Rendering the index file from the views folder
});

// Campgrounds get Route
app.get("/campgrounds", function(req, res){ // Using express to create HTTP route, with required callback
    Campground.find({}, function(err, databaseCampgrounds){
        if(err){
            console.log(err)
        } else {
            // Rendering the campgrounds file from the views folder and the campgrounds from the "yelpcampdb" Mongo database
            res.render("campgrounds.ejs", {campgrounds:databaseCampgrounds});
        }
    });
});

// Campgrounds post Route
app.post("/campgrounds", function(req, res){
    // Grabbing "name" from newcamp.ejs form and saving to "name" variable
    let name = req.body.name;
    // Grabbing "image" from newcamp.ejs form and saving to "image" variable
    let image = req.body.image;
    // Grabbing "description" from newcamp.ejs form and saving to "description" variable
    let description = req.body.description;
    // Creating a database usable variable, an object, the names and images of which house the above form variables
    let newCampground = {name: name, image: image, description: description};
    // Create a new campground and saving it to the "yelpcampdb" database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds");
            console.log("A NEW CAMPGROUND WAS CREATED:");
            console.log(newlyCreated);
        }
    });
});

// New Campground Route
app.get("/campgrounds/new", function(req, res){
    res.render("newcamp.ejs");
});

// Show Campground Info Route
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campdetails.ejs", {campground: foundCampground});
        }
    });
    
    // Render show template with that campground
     
});




// SERVER

// // Setting localhost port
// const port = 3000
// // Server displaying app on localhost:3000 with success message log
// app.listen(port, () => console.log(`YelpCamp app server listening on port ${port}!`))

// process.env must be used on Amazon c9.io dev platform in order to view local app
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server up and running!!!");
});



