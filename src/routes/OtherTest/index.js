const {Router}=require("express");
const router=Router();
const diet = require("./Diet/index.js").handler;
const dish = require("./Dish/index.js").handler;
const reservation = require("./Reservation/index.js").handler;
const table = require("./Table/index.js").handler;
const user = require("./User/index.js").handler;

router.use(
  ( req, res, next )=>{ 
    if( Buffer.isBuffer(req.body) && req.body.length ) req.body = JSON.parse( req.body );
    next(); 
  },
  diet, dish, reservation, table, user
);

module.exports.handler=router;