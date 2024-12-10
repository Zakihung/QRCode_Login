const express = require('express');
const router = express.Router();
const qr = require('../controllers/QRCode.controller');

router.route("/gencode")
    .post(qr.generate)

router.route("/")
    .delete(qr.deleteQR);

router.route("/verify")
    .post(qr.verify)

module.exports = router;
