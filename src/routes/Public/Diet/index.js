const {Router}=require("express");
const router = Router();
const getDiet = require("./Get/index.js").handler;

router.use("/diet", getDiet);

module.exports.handler = router;