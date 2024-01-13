const { Router } = require('express');
const router = Router();

const test = require("./Test/index.js").handler;
const public = require("./OtherTest/index.js").handler

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use( "/public", public );

module.exports.handler = router;