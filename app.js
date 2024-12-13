const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require('./utils/ExpressError');
const item = require("./routes/item")
const review = require("./routes/review")
const session = require("express-session");
const flash = require("connect-flash");




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

app.get("/", (req, res) => {
    res.send("Root");
})

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash('error');
    // console.log(res.locals.success);
    next();
})

//Item Route
app.use("/top-deal", item);

//Reviews Route
app.use("/top-deal/:id/review", review);


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