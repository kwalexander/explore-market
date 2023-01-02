const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,
  saveProduct,
  saveTravel,
  deleteProduct,
  deleteTravel,
  
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveProduct);
router.route('/').post(createUser).put(authMiddleware, saveTravel);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/product/:productID').delete(authMiddleware, deleteProduct);

router.route('/travel/:travelID').delete(authMiddleware, deleteTravel);

module.exports = router;
