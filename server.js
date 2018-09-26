// set up dependecies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// set up port, host port or 3000
var PORT = process.env.PORT || 3000;

// create instance of express app
var app = express();

// create express router
var router = express.Router();


app.use(bodyParser.urlencoded({
    extended: false
}));

// public folder will be static directory
app.use(express.static(__dirname + "/public"));

// handlebars connection
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// require routes pass through router
require("./config/routes")(router);



// requests pass through router middleware
app.use(router);


// local database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// connect to db
mongoose.connect(db, function (error) {
    //log errors
    if (error) {
        console.log(error);
    }

    else {
        console.log("successful connection");
    }
});

// Listen on said port
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});