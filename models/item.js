// This file is used to make Schema for the items.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review")

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
        default: "/itemImages/download.jpeg",
        set: (v) => v === "" ? "/itemImages/download.jpeg" : v
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

itemSchema.post("findOneAndDelete", async (item) => {
    if (item) {
        await Review.deleteMany({ _id: { $in: item.review } })
    }

})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;