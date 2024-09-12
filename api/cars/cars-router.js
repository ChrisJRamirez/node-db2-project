const express = require("express");
const db = require("../../data/db-config");

const Car = require("./cars-model");
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require("./cars-middleware")

const router = express.Router();

// [GET] /api/cars
router.get("/", async (req, res, next) => {
 try{ 
   const cars = await Car.getAll()
    res.json(cars)
  } catch(err){
    next(err)
  }
});

// [GET] /api/cars/:id
router.get("/:id", checkCarId, async (req, res, next) => {
  try{
    const car = await Car.getById(req.params.id)
      res.json(car)
  } catch(err){
    next(err)
  }
});

// [POST] /api/cars
router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
try{
  const newCar = await Car.create({
    vin :req.body.vin,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage,
    title: req.body.title,
    transmission: req.body.transmission
  });
  res.status(201).json(newCar)
} catch(err){
  next(err)
}

})

module.exports = router;