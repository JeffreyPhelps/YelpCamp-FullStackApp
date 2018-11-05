// Jeffrey Phelps 2018



// PACKAGES

// Initializing Express.js NPM package
const express = require("express");
const app = express();

// Initializing body-parser NPM package
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));





// Creating initial campgrounds array and variable
let campgroundsArray = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_960_720.jpg"},
    {name: "Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg"}
]





// HTTP ROUTES

// Homepage Route
app.get("/", function(req, res){ // Using express to create HTTP route, with required callback
    res.render("index.ejs"); // Rendering the index file from the views folder
});

// Campgrounds Route
app.get("/campgrounds", function(req, res){ // Using express to create HTTP route, with required callback
    res.render("campgrounds.ejs", {campgrounds:campgroundsArray}); // Rendering the campgrounds file from the views folder
});                                                                // and the campgroundsArray as "campgrounds" variable



app.get("/campgrounds/new", function(req, res){
    res.render("newcamp.ejs");
});


app.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    campgroundsArray.push(newCampground);
    res.redirect("/campgrounds");
});



// SERVER

// Setting localhost port
const port = 3000
// Server displaying app on localhost:3000 with success message log
app.listen(port, () => console.log(`YelpCamp app server listening on port ${port}!`))


