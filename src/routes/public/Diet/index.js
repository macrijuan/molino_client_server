const {Router}=require("express");
const router = Router();
const getDiet = require("./Get").handler;

router.use("/diet", getDiet);

module.exports.handler = router;