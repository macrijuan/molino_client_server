const { Router } = require('express');
const router = Router();
const diet = require("./Diet").handler;
const dish = require("./Dish").handler;
const reservation = require("./Reservation").handler;
const table = require("./Table").handler;
const user = require("./User").handler;

router.use(
  ( req, res, next )=>{ 
    if( req.body.length ) req.body = JSON.parse( req.body );
    next(); 
  },
  diet, dish, reservation, table, user
);

module.exports.handler = router;