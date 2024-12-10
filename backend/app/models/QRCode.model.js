const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    token: { type: String, required: true },
    sessionDetails: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: '10m' } },
});

module.exports = mongoose.model("QRCode", QRCodeSchema, "QRCode");
