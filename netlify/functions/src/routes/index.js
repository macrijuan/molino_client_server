const { Router } = require('express');
const router = Router();

// const test = require("./Test");
const public = require("./Public");

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use( "/public", public );


module.exports = router;