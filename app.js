const express = require("express");
// add path
const path = require("path");

const app = express();

// for post on form
app.use(express.urlencoded({ extended: false }));

// switch cookie parser on
// not needed since 1.5.0 of cookie-session
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// sessions
const session = require("express-session");
app.use(
  session({
    secret: "someTopSecret",
    resave: true,
    saveUninitialized: true
  })
);

const routes = require("./routes/routes");

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use("/", routes());

// remove for sample files
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(3000);

console.log("Express on 3000");

module.exports = app;
