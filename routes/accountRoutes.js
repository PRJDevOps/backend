const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

router.route('/')
  .post(accountController.createAccount)
  .get(accountController.getAllAccounts);

router.route('/:id')
  .get(accountController.getAccount)
  .put(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;