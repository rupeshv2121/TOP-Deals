const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Review = require("../models/review")
const Item = require("../models/item")


// POST Route
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let item = await Item.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    item.review.push(newReview);

    await newReview.save();
    await item.save();
    req.flash("success", "Review Created Successfully");
    res.redirect(`/top-deal/${item._id}`);
}))

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Item.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/top-deal/${id}`)
}))


module.exports = router;