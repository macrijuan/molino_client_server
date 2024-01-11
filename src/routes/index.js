const { Router } = require('express');
const router = Router();
const public = require('./public').handler;

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use("/public", public);

module.exports.handler = router;