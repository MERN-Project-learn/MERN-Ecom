const express = require("express");
const {
  processPayment,
  sendStripeApiKey, 
} = require("../controllers/paymentController"); 
const router = express.Router();
const { isAuthentictedUser } = require('../middleware/auth');


router.route("/payment/process").post(isAuthentictedUser, processPayment);

router.route("/stripeapikey").get(isAuthentictedUser, sendStripeApiKey);

module.exports = router;