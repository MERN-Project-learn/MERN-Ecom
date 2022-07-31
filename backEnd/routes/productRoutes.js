const express = require('express');
const { getAllProducts ,createProduct,UpdateProduct,DeleteProduct,getproductDetails, createProductReview, getProductReviews, deleteReview,getAdminProducts} = require('../controllers/productController');
const { isAuthentictedUser, authorizeRole } = require('../middleware/auth');
const router = express.Router();
 
router.route('/products').get(getAllProducts)
router
  .route("/admin/products")
  .get(isAuthentictedUser, authorizeRole("admin"), getAdminProducts);

router.route('/admin/products/new-product').post(isAuthentictedUser,authorizeRole("admin"),createProduct)
router.route('/admin/products/:id')
.put(isAuthentictedUser,authorizeRole("admin"),UpdateProduct)
.delete(isAuthentictedUser,authorizeRole("admin"),DeleteProduct)
.get(getproductDetails)

router.route("/product/:id").get(getproductDetails )
router.route('/review').put(isAuthentictedUser,createProductReview)
router.route('/reviews').get(getProductReviews).delete(isAuthentictedUser,deleteReview)


module.exports = router; 