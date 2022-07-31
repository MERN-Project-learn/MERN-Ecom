const express = require('express');
const { newOrder, getSingleOrder, myOrders,getAllOrders,updateOrder ,deleteOrder} = require('../controllers/orderController');
const router = express.Router()
const { isAuthentictedUser, authorizeRole } = require('../middleware/auth');

router.route("/order/new").post(isAuthentictedUser, newOrder);

router.route("/order/:id").get(isAuthentictedUser, authorizeRole('admin'), getSingleOrder);
 
router.route("/orders/me").get(isAuthentictedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthentictedUser, authorizeRole("admin"), getAllOrders);

  router
  .route("/admin/order/:id")
  .put(isAuthentictedUser, authorizeRole("admin"), updateOrder)
  .delete(isAuthentictedUser, authorizeRole("admin"), deleteOrder);


module.exports = router;
