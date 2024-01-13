const { Router } = require('express');
const router = Router();
const { Dish } = require("../db.js").handler;
// const public = require("./Test").handler;
const test = require("./OtherTest").handler;

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use( "/public", test );

module.exports.handler = router;