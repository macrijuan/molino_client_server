const { Router } = require('express');
const router = Router();
const t = require("./public/index.js");

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use("/public",t);

module.exports = router;
