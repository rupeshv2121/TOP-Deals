const Item = require("../models/item.js");

module.exports.index = async (req, res) => {
    const allItems = await Item.find({});
    // console.log(allItems);
    res.render("./items/index.ejs", { allItems });
}

module.exports.renderNewForm = (req, res) => {
    res.render('./items/new.ejs');
};

module.exports.showItem = async (req, res) => {
    let { id } = req.params;
    const item = await Item.findById(id).populate({ path: "review", populate: { path: "author" } }).populate("owner");
    // console.log(item);
    if (!item) {
        req.flash("error", "Item You requested, Does not exist");
        res.redirect('/top-deal');
    }
    res.render("./items/show.ejs", { item });
}

module.exports.createItem = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newItem = new Item(req.body.item);
    newItem.owner = req.user._id;
    newItem.image = { url, filename };
    await newItem.save();
    req.flash("success", "New Item Added");
    res.redirect("/top-deal");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
        req.flash('error', "Listing you requested, Does not exist");
    }
    let originalImageUrl = item.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("./items/edit.ejs", { item, originalImageUrl });
}

module.exports.updateItem = async (req, res) => {
    let { id } = req.params;
    let item = await Item.findByIdAndUpdate(id, { ...req.body.item })

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        item.image = { url, filename };
        await item.save();
    }

    req.flash("success", "Product Updated Successfully");
    res.redirect(`/top-deal/${id}`);
}

module.exports.destroyItem = async (req, res) => {
    let { id } = req.params;
    let deleteItem = await Item.findByIdAndDelete(id);
    console.log(deleteItem);
    req.flash("success", "Item Deleted Successfully");
    res.redirect("/top-deal");
}