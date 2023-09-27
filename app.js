//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

// mongoose user schema
const userSchema =  new mongoose.Schema ({
  email: String,
  password: String,
}) ;



const secret= "TOPSECRET";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});










// user model using the user schema
const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {  
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

//creates new user from the register page
app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.render("secrets");
    })
    .catch((err) => {
      console.log(err);
    });
});

//from login.ejs accepts credentials, if they match it renders secrets.ejs
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username })
    .then((foundUser) => {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    })

    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("server is up");
});
