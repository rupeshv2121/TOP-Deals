//This file is used to initialise the item data which is stored in data.js file

const mongoose = require("mongoose");
const initData = require("./data.js");
const Item = require("../models/item.js");
const MONGO_URL = "mongodb://localhost:27017/top_deals";

main().then(() => {
    console.log("Connected to DB");
})
    .catch(err => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Item.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "675d4b5b2c44e4d0ed9136f9" }));
    await Item.insertMany(initData.data);
    console.log("Initialised Database");
}

initDB();