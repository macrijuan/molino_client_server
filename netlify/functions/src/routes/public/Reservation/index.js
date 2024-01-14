const {Router}=require("express");
const router = Router();
const postReservation = require("./Post/index.js");
const updateReservation = require("./Put/index.js");
const getReservation = require("./Get/index.js");
const deleteReservation = require("./Delete/index.js");

router.use("/reservation", postReservation, updateReservation, getReservation, deleteReservation);

module.exports = router;