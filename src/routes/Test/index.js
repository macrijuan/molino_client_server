const {Router}=require("express");
const router = Router();

router.get("/asdf", (res,res)=>{
  res.send("HEY!");
});

module.exports.handler = router;
