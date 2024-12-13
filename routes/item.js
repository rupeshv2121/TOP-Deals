const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError.js');
const { itemSchema } = require("../Schema.js");
const Item = require("../models/item.js");

const validateItem = (req, res, next) => {
    let { error } = itemSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
}

router.get("/", wrapAsync(async (req, res) => {
    const allItems = await Item.find({});
    // console.log(allItems);
    res.render("./items/index.ejs", { allItems });
}))

//New Route (Add new Item)
router.get("/new", (req, res) => {
    res.render("./items/new.ejs");
})

//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const item = await Item.findById(id).populate("review");
    // console.log(item);
    if (!item) {
        req.flash("error", "Item You requested, Does not exist");
        res.redirect('/top-deal');
    }
    res.render("./items/show.ejs", { item });
}))

//Create Route (Add item to the landing page)
router.post("/", validateItem, wrapAsync(async (req, res, next) => {
    const newItem = new Item(req.body.item);
    await newItem.save();
    req.flash("success", "New Item Added");
    res.redirect("/top-deal");
}))

//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
        req.flash('error', "Listing you requested, Does not exist");
    }
    res.render("./items/edit.ejs", { item });
}))

//Update Route
router.put('/:id', validateItem, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Item.findByIdAndUpdate(id, { ...req.body.item })
    req.flash("success", "Product Updated Successfully");
    res.redirect(`/top-deal/${id}`);
}))

//Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteItem = await Item.findByIdAndDelete(id);
    console.log(deleteItem);
    req.flash("success", "Item Deleted Successfully");
    res.redirect("/top-deal");
}))

module.exports = router;