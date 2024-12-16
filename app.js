if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require('./utils/ExpressError');
const itemRouter = require("./routes/item")
const reviewRouter = require("./routes/review")
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRouter = require("./routes/user");



const MONGO_URL = "mongodb://localhost:27017/top_deals";
main().then(() => {
    console.log("Connected TO TOP Deals Database");
})
    .catch(err => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));  // Convert Request into other forms like POST-->PUT
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, './public/itemImages')));

const sessionOptions = {
    secret: "mySuperSecretCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // in milli Seconds
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,  //for security purpose -> cross scriptiong attacks
    }
}

// app.get("/", (req, res) => {
//     res.send("Root");
// })

app.use(session(sessionOptions));
app.use(flash());

//passport is used after session MiddleWare
app.use(passport.initialize());
app.use(passport.session()); // same user browser from page to page.

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());  // to serialize into the session(means to store info related to user)
passport.deserializeUser(User.deserializeUser()); // to de-serialize into the session(means to remove info related to user)

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    // console.log(res.locals.success);
    next();
})

// app.get("/demoUser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student",
//     })

//     //Convenience method to register a new user instance with a given password. Automatically check new user
//     // register(user, password, callback) 
//     let registeredUser = await User.register(fakeUser, "helloWorld");
//     res.send(registeredUser);
// })

//Item Route
app.use("/top-deal", itemRouter);

//Reviews Route
app.use("/top-deal/:id/review", reviewRouter);

//User Route
app.use("/", userRouter);


//Error
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went's Wrong" } = err;
    res.status(statusCode).render("Error.ejs", { err });
})


// app.get("/testItem", async (req, res) => {
//     let sampleItem = new Item({
//         title: "Temperature Bottle",
//         description: "Bottle That measures Temperature also",
//         price: 199,
//         image: "https://www.bing.com/images/search?view=detailV2&ccid=O8ibkMr3&id=A3C1F8A0DA55FF7A2BF4C6C51B54AE4D10B57925&thid=OIP.O8ibkMr3srCjAJF84B_qFwHaHa&mediaurl=https%3a%2f%2falexnld.com%2fwp-content%2fuploads%2f2020%2f01%2f58ebc752-79f3-4337-8515-c5cd2387f99a.jpg&exph=800&expw=800&q=temperature+bott%3be&simid=607990425967741677&FORM=IRPRST&ck=2D41BCAEC47BE98ECEDE26CBD3418D28&selectedIndex=4&itb=0"
//     })

//     await sampleItem.save();
//     console.log("Item Was Saved");
//     res.send("Good Job!")
// })
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})