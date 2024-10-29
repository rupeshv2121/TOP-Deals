// This file is used to make Schema for the items.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: "./itemImages/download.jpeg",
        set: (v) => v === "" ? "./itemImages/download.jpeg" : v
    }
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;