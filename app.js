// Imports
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Set up
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// fake database lmao
let friends = ["Jim", "Jimmy", "Bob", "Bobby"];

// routes
app.get("/", function(request, response){
    response.render("index.ejs");
});

app.get("/love/:thing", function(request, response){
    let thing = request.params.thing;
    let context = {
        loveThing: thing,
    }

    response.render("love.ejs", context);
});

app.get("/posts", function(request, response){
    let posts = [
        {title: "Post1", author: "Bob"}, 
        {title: "Post2", author: "Bobeth"},
        {title: "Post3", author: "Bobery"},
        {title: "Post4", author: "Bobby"}];
    let context = {
        posts: posts,
    }
    response.render("posts.ejs", context)
})

app.get("/friends", function(request, response){
    let context = {friends: friends};
    response.render("friends", context);
});

// This needs body-parser so that we can get request.body to not be undefined
app.post("/addfriend", function(request, response){

    let new_friend = request.body.friend_name;
    friends.push(new_friend);

    response.redirect("/friends");
})

// This starts the server (I think...)
app.listen(3000, function(){
    console.log("App running on localhost:3000/");
});