const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require("../Schema.js");
const Review = require("../models/review")
const Item = require("../models/item")


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// POST Route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let item = await Item.findById(req.params.id);
    let newReview = new Review(req.body.reviews);
    item.review.push(newReview);

    await newReview.save();
    await item.save();
    console.log(newReview);
    res.redirect(`/top-deal/${item._id}`);
}))

//Delete Review Route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Item.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/top-deal/${id}`)
}))


module.exports = router;