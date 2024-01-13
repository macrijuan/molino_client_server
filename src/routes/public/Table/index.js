const {Router}=require("express");
const router = Router();
const getTable=require("./Get/index.js").handler;

router.use("/table", getTable);

module.exports.handler = router;