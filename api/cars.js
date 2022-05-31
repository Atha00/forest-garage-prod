const express = require("express");
const router = express.Router();

const { cars } = require("../models");

const isAuthenticated = (req, res, next) => {
  if (req.headers.authorization === `Bearer ${process.env.ACCESS_TOKEN}`) {
    next();
  } else {
    res.json({ message: "Unauthorized" });
  }
};

router.post("/api/cars/create", isAuthenticated, async (req, res) => {
  try {
    const newCar = new cars({
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
    });
    await newCar.save();
    res.status(200).json(newCar);
  } catch (e) {
    console.log(e.message);
    return "Error";
  }
});

module.exports = router;
