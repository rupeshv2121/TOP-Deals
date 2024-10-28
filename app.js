const express = require("express");
const app = express();
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
    res.send("Root");
})

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})