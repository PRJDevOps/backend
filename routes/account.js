const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, accountController.createAccount);
router.get('/', authMiddleware, accountController.getAllAccounts);
router.get('/:id', authMiddleware, accountController.getAccount);
router.put('/:id', authMiddleware, accountController.updateAccount);
router.delete('/:id', authMiddleware, accountController.deleteAccount);

module.exports = router;