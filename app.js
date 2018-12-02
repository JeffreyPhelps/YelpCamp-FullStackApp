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
        User = require("./models/user.js"), // Importing user database seed file, user.js
        seedDB = require("./seeds.js"); // Importing database seed file, seeds.js




// Connecting Mongoose and setting the Mongo database name, "yelpcampdb"
mongoose.connect("mongodb://localhost/yelpcampdb", {useNewUrlParser: true}); // Optional {useNewUrlParser: true} object for Amazon c9.io to clear future error warning

// Setting body-parser NPM package
app.use(bodyParser.urlencoded({extended: true}));

// Setting the app view engine as ejs
app.set("view engine", "ejs");

// Setting app folder
app.use(express.static(__dirname + "/public")); // "__dirname" refers to the main project folder

// Calling function from seeds.js to seed mongo database
// seedDB();

// Seed Database




// Passport Auth Config
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Encripting and Decripting user auth data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});




// HTTP ROUTES

// Homepage Route
app.get("/", function(req, res){ // Using express to create HTTP route, with required callback
    // res.render("index.ejs")
    res.redirect("/campgrounds"); // Initially rendering campgrounds page as the homepage
});

// Campgrounds Route
app.get("/campgrounds", function(req, res){ // Using express to create HTTP route, with required callback
    Campground.find({}, function(err, databaseCampgrounds){
        if(err){
            console.log(err);
        } else {
            // Rendering the campgrounds file from the views folder
            res.render("campgrounds.ejs", {campgrounds:databaseCampgrounds, currentUser: req.user});
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
    // Grabbing username and user id from logged in user
    let author = {id: req.user._id, username: req.user.username};
    // Creating a database usable variable, an object, the names and images of which house the above form variables
    let newCampground = {name: name, image: image, description: description, author: author};
    // Create a new campground and saving it to the "yelpcampdb" database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log("A NEW CAMPGROUND WAS CREATED:");
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// New Campground Route
app.get("/campgrounds/new", isLoggedIn, function(req, res){
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("newcomment.ejs", {campground: campground});
       }
    });
});

// Comments Post Route
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Auth Route
app.get("/register", function(req, res){
    res.render("register.ejs");
});

// Signup Logic
app.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// Login Route
app.get("/login", function(req, res){
    res.render("login.ejs");
});

// Login Logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
        
    }), function(req, res){
    
});

// Logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});


// Login Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


// // Run only when wanting to remove all campgrounds
// // Remove all campgrounds
// Campground.remove({}, function(err){
//     if(err){
//         console.log(err)
//     } else {
//         console.log("Removed all campgrounds");
//     }
// });




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




