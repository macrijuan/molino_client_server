const { Router } = require("express");
const router = Router();

router.get("/test", (req,res)=>{
  res.send("HOLAAAA");
});

module.exports.handler = router;