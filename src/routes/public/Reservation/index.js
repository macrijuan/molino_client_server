const {Router}=require("express");
const router = Router();
const postReservation = require("./Post/index.js").handler;
const updateReservation = require("./Put/index.js").handler;
const getReservation = require("./Get/index.js").handler;
const deleteReservation = require("./Delete/index.js").handler;

router.use("/reservation", postReservation, updateReservation, getReservation, deleteReservation);

module.exports.handler = router;