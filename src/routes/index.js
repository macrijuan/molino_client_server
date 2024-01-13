const { Router } = require('express');
const router = Router();

const wtf = require("./Q").handler;
const public = require("./Public").handler;

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use( "/public", public, wtf );

module.exports.handler = router;