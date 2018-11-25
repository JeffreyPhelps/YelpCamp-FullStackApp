




const mongoose = require("mongoose");

let Campground = require("./models/campground");

let Comment = require("./models/comment");


// initial Campgrond data
let initialData = [
        {
            name: "Blueberry Hill", 
            image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424_960_720.jpg",
            description: "You wouldn't believe the blueberries!"
        },
        {
            name: "Daisy Mountain", 
            image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424_960_720.jpg",
            description: "The daisies are everywhere!"
        },
        {
            name: "Oceanside Park", 
            image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424_960_720.jpg",
            description: "You can see the ocean from each campsite!"
        },
    ]


function seedDB(){
    
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("Removed all campgrounds");
        }
    });
    
    // Loop through each campground and add initial campgrounds data to the database
    initialData.forEach(function(seed){
        
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                
                console.log("Added initial campground");
                
                Comment.create({text: "This place is the best!", author: "Homer"}, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                    }
                });
                
            }
        });
        
    });
    
}


module.exports = seedDB;



