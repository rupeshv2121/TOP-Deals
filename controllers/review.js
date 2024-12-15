const Review = require("../models/review")
const Item = require("../models/item")

module.exports.createReview = async (req, res) => {
    let item = await Item.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    item.review.push(newReview);

    await newReview.save();
    await item.save();
    req.flash("success", "Review Created Successfully");
    res.redirect(`/top-deal/${item._id}`);
}

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Item.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/top-deal/${id}`)
}
