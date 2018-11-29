// Jeffrey Phelps 2018




// PACKAGES

// Initializing NPM packages
const   express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        passport = require("passport"),
        LocalStrategy = require("passport-local");
        


// IMPORTS

const   Campground = require("./models/campground.js"), // Importing the Campground Schema and model from campground.js
        Comment = require("./models/comment.js"), // Importing the Comments Schema and model from comment.js
        seedDB = require("./seeds.js") // Importing database seed file, seeds.js



// Connecting Mongoose and setting the Mongo database name, "yelpcampdb"
mongoose.connect("mongodb://localhost/yelpcampdb", {useNewUrlParser: true}); // Optional {useNewUrlParser: true} object for Amazon c9.io to clear future error warning

// Setting body-parser NPM package
app.use(bodyParser.urlencoded({extended: true}));

// Setting the app view engine as ejs
app.set("view engine", "ejs");

// Setting app folder
app.use(express.static(__dirname + "/public")); // "__dirname" refers to the main project folder

// Calling function from seeds.js to seed mongo database
seedDB();





// HTTP ROUTES

// Homepage Route
app.get("/", function(req, res){ // Using express to create HTTP route, with required callback
    res.render("index.ejs"); // Rendering the index file from the views folder
});

// Campgrounds get Route
app.get("/campgrounds", function(req, res){ // Using express to create HTTP route, with required callback
    Campground.find({}, function(err, databaseCampgrounds){
        if(err){
            console.log(err);
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
            console.log(err);
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campdetails.ejs", {campground: foundCampground});
        }
    });
    
});


// Comments Route
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("newcomment.ejs", {campground: campground});
       }
    });
    
});

// Comments Post Route
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});





 // SERVER

// // Setting localhost port
// const port = 3000
// // Server displaying app on localhost:3000 with success message log
// app.listen(port, () => console.log(`YelpCamp app server listening on port ${port}!`))

// process.env must be used on Amazon c9.io dev platform to view local app
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server up and running!!!");
  console.log("Go to link: https://yelpcampapp-phelpsjeffrey.c9users.io/")
});




