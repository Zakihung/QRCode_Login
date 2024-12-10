const express = require('express');
const router = express.Router();
const user = require('../controllers/User.controller');

router.route("/login").post(user.login);
router.route("/register").post(user.register);
router.route("/getUser/:id").get(user.getUser);

module.exports = router;
