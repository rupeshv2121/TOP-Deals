const express = require('express');
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mySuperSecretString", resave: false, saveUninitialized: true
}


app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("Success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;

    if (name === "anonymous") {
        req.flash("error", "User not registered");
    } else {
        req.flash("Success", "User Registered Successfully");
    }

    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    res.render("pages.ejs", { name: req.session.name });
})

// app.get("/test", (req, res) => {
//     res.send("test successful");
// })

app.get("/reqCount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You send a request ${req.session.count} times`);
});


app.listen(3000, () => {
    console.log("Server is listening");
});