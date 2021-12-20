const db  = require("../../data/db-config");
const Car = require("../cars/cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if(car){
      req.car = car
      next()
    } else{
        res.status(404).json({message: `car with id ${req.params.id} is not found`})
    }

  } catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  if(!vin){
    res.status(400).json({message:`vin is missing`})
  }
  else if (!make){
    res.status(400).json({message:`make is missing`})
  }
  else if (!model){
    res.status(400).json({message:`model is missing`})
  }
  else if (!mileage){
    res.status(400).json({message:`mileage is missing`})
  }
  else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const {vin} = req.body
  const isValidVin = vinValidator.validate(vin)
  if(isValidVin === false){
    res.status(400).json({message: `vin ${vin} is invalid`})
  } else{
    next()
  }

  
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const existingVin = await db("cars")
    .where("vin", req.body.vin.trim()).first()

    if(existingVin){
      res.status(400).json({message:`vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  } catch(err){
    next(err) // this might break server
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}