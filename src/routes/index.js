const { Router } = require('express');
const router = Router();
const { Dish } = require("../db.js");
// const public = require("./public").handler;

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/test", async(req,res)=>{
  Dish.findAll().then(dishes=>{
    res.json(dishes)
  }).catch(err=>res.send(err));
});

// router.use("/public", public);

module.exports.handler = router;