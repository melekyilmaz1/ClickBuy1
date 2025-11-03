const express = require("express");
const mongoose = require("mongoose"); // 👈 ObjectId dönüşümü için eklendi
const router = express.Router();
const Product = require("../models/Product.js");

// Yeni bir ürün oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm ürünleri getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir ürünü getirme (Read - Single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ Yorum ekleme (ObjectId ile düzeltildi)
router.post("/:productId/reviews", async (req, res) => {
  try {
    const { text, rating, user } = req.body;

    console.log("Gelen yorum verisi:", { text, rating, user });
    console.log("user tipi:", typeof user);

    if (!text || !rating || !user) {
      console.log("Eksik veri gönderildi.");
      return res.status(400).json({ error: "Eksik veri gönderildi." });
    }

    const product = await Product.findById(req.params.productId);
    if (!product) {
      console.log("Ürün bulunamadı.");
      return res.status(404).json({ error: "Product not found." });
    }

    console.log("Ürün bulundu:", product.name);

    // 🔧 user ID ObjectId formatına zorla çevrildi
    product.reviews.push({
      text,
      rating,
      user: mongoose.Types.ObjectId(user),
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log("Yorum eklenirken hata:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

// Ürün güncelleme (Update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürün silme (Delete)
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürünleri isme göre ara
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
