


// MONGO-MONGOOSE SETUP

// Initializing Mongoose NPM package
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catsdb");

// Setting initial MongoDB schema structure
let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// Initializing schema and database reference name
const Cat = mongoose.model("Cat", catSchema);





// ADDING TO DATABASE

// // VERSION 1

// // Initializing new cat
// let newCatVar = new Cat({ // new Cat() object matching schema structure
//     name: "Chunk Norris",
//     age: 8,
//     temperament: "Typical"
// });

// // Saving new cat to database, with optional callback function 
// newCatVar.save(function(err, newCat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!!!");
//     } else {
//         console.log("A new cat was just saved to the database!");
//     }
// });


// // VERSION 2

// // Version 2 initializes and saves new addition at the same time, with optional callback
// Cat.create({
//     name: "Purrrson",
//     age: 9,
//     temperament: "calm"
// }, function(err, newCat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!!!");
//     } else {
//         console.log("A new cat was just added to the database!");
//     }
// });





// RETRIEVING FROM DATABASE

// Retrieve all cats and log to console

Cat.find({}, function(error, cats){
    if(error){
        console.log("OH, NO, ERROR!!! ...Of some sort.")
    } else {
        console.log("All the cats:")
        console.log(cats);
    }
});




