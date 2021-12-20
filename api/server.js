const express = require("express");

const carRouter = require("./cars/cars-router");

const server = express();

server.use(express.json());

server.use("/api/cars", carRouter);

server.get("/", (req, res) => {
  res.status(200).json({api: "up and running"})
})

module.exports = server
