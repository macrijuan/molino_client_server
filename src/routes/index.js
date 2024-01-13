const { Router } = require('express');
const router = Router();

const test = require("./Test").handler;
const public = require("./Public").handler;

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use( "/public", public, test );

module.exports.handler = router;