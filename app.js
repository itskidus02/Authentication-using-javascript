//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();

console.log(process.env.SECRET);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

// mongoose user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

// user model using the user schema
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout(function(err) {
    // This function will be called after logout is complete.
    if (err) {
      // Handle any errors that occurred during logout.
      console.error(err);
      // You might want to send an error response here.
      res.status(500).send("Logout error");
    } else {
      // If logout was successful, redirect to the home page.
      res.redirect("/");
    }
  });
});


//creates new user from the register page
app.post("/register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

//from login.ejs accepts credentials, if they match it renders secrets.ejs
app.post("/login", (req, res) => {

const user = new User({
  username: req.body.username,
  password: req.body.password
});





req.login(user, function(err){
  if( err){
    console.log(err);
  } else{
    passport.authenticate("local")(req, res, function () {
      res.redirect("/secrets");
    }); 
  }
})








});

app.listen(3000, () => {
  console.log("server is up");
});
