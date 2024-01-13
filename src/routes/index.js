const { Router } = require('express');
const router = Router();
const { Dish } = require("../db.js").handler;
// const public = require("./Test").handler;
const test = require("./OtherTest");

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/test", async(req,res)=>{
  Dish.findAll().then(dishes=>{
    res.json(dishes)
  }).catch(err=>res.send(err));
});

router.use( "/public", test.handler );

module.exports.handler = router;