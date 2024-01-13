const { Router } = require("express");
const router = Router();

router.get("/test", async(req,res)=>{
  res.send("HOLAAAA");
});

module.exports.handler = router;