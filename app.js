const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/item");
const path = require("path");

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

app.get("/", (req, res) => {
    res.send("Root");
})

//Index Route
app.get("/top-deal", async (req, res) => {
    const allItems = await Item.find({});
    res.render("./items/index.ejs", { allItems });
})

//New Route (Add new Item)
app.get("/top-deal/new", (req, res) => {
    res.render("./items/new.ejs");
})

//Show Route
app.get("/top-deal/:id", async (req, res) => {
    let { id } = req.params;
    const item = await Item.findById(id);
    res.render("./items/show.ejs", { item });
})

//Create Route (Add item to the landing page)
app.post("/top-deal", async (req, res) => {
    const newItem = new Item(req.body.item);
    await newItem.save();
    res.redirect("/top-deal");
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