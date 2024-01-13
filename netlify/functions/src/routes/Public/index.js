const {Router}=require("express");
const router=Router();
const diet = require("./Diet/index.js");
const dish = require("./Dish/index.js");
const reservation = require("./Reservation/index.js");
const table = require("./Table/index.js");
const user = require("./User/index.js");

router.get("/", (req,res)=>{
  res.send("helloo!");
});

router.use(
  ( req, res, next )=>{ 
    if( Buffer.isBuffer(req.body) && req.body.length ) req.body = JSON.parse( req.body );
    next(); 
  },
  diet, dish, reservation, table, user
);


module.exports = router;