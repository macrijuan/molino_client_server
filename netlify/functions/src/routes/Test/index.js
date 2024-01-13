const { Router } = require("express");
const router = Router();

router.get("/tests", (req,res)=>{
  res.send("HOLAAA");
});

module.exports = router;