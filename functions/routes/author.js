const express = require("express");
const AuthorModel = require("../models/author");

const router = express.Router();
//Get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await AuthorModel.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//getSingleAuthor

router.get("/:id", getAuthor, (req, res) => {
  res.json(res.author);
});

router.post("/", async (req, res) => {
  try {
    //validate the request
    if (!req.body.productType || !req.body.quantity) {
      return res
        .status(400)
        .json({ message: "Product type and quantity are required" });
    }
    //check if product already exists
    const existingProduct = await AuthorModel.findOne({
      name: req.body.productType,
    });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = new AuthorModel(req.body);
    // check if quantity is greater than 0
    if (product.quantity > 0) {
      product.status = "In stock";
    } else {
      product.status = "Out of stock";
    }
    const newProduct = await product.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//updateAuthor
router.patch("/:id", getAuthor, async (req, res) => {
  try {
    if (req.body.productType != null) {
      res.author.productType = req.body.productType;
    }
    const updatedProduct = await res.author.save();
    res.json({ message: "Author updated", author: updatedAuthor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", getAuthor, async (req, res) => {
  try {
    // check if quantity is greater than 0
    if (req.body.quantity > 0) {
      req.body.status = "In stock";
    } else if (req.body.quantity <= 0) {
      req.body.status = "Out of stock";
    }

    const updatedProduct = await AuthorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Product updated", author: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//deleteAuthor
router.delete("/:id", getAuthor, async (req, res) => {
  try {
    await AuthorModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Author deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
async function getAuthor(req, res, next) {
  try {
    const author = await AuthorModel.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.author = author;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = router;
