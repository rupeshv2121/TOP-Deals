const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateItem } = require("../middleware.js")
const itemController = require("../controllers/item");
const multer = require("multer");
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage })


router
    .route("/")
    .get(wrapAsync(itemController.index)) // Index Route
    .post(isLoggedIn, upload.single('item[image]'), validateItem, wrapAsync(itemController.createItem))  //Create Route (Add item to the landing page)

//New Route (Add new Item)
router.get("/new", isLoggedIn, itemController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(itemController.showItem))  //Show Route
    .put(isLoggedIn, isOwner, upload.single('item[image]'), validateItem, wrapAsync(itemController.updateItem))   //Update Route
    .delete(isLoggedIn, isOwner, wrapAsync(itemController.destroyItem))   //Delete Route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(itemController.renderEditForm))

module.exports = router;