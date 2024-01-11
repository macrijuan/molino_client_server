const { Router } = require('express');
const router = Router();
const getDish = require("./Get").handler;

//getDish SENDS ONE OR MULTIPLE DISHES
router.use("/dish", getDish );

module.exports.handler = router;