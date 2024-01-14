const { Router } = require("express");
const router = Router();

const diet = require("./Diet");
const dish = require("./Dish");
const reservation = require("./Reservation");
const table = require("./Table");
const user = require("./User");

router.use(
  (req,res,next)=>{
    if(Buffer.isBuffer(req.body) && req.body.length)req.body = JSON.parse(req.body);
    next();
  },
  diet, dish, reservation, table, user
);

module.exports = router;