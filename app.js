// Jeffrey Phelps 2018



// PACKAGES

// Initializing Express.js NPM package
const express = require("express");
const app = express();






// HTTP ROUTES

// Homepage Route
app.get("/", function(req, res){ // Using express to create HTTP route, with required callback
    res.render("index.ejs"); // Rendering the index file from the views folder
});

// Campgrounds Route
app.get("/campgrounds", function(req, res){ // Using express to create HTTP route, with required callback

    let campgroundsArray = [
        {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg"},
        {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_960_720.jpg"},
        {name: "Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg"}
    ]

    res.render("campgrounds.ejs", {campgrounds:campgroundsArray}); // Rendering the campgrounds file from the views folder
});                                                                // and the campgroundsArray as "campgrounds" variable






// SERVER

// Setting localhost port
const port = 3000
// Server displaying app on localhost:3000
app.listen(port, () => console.log(`YelpCamp app server listening on port ${port}!`))


