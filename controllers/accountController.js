const Account = require('../models/account');
const User = require('../models/user');

// Create new account
exports.createAccount = async (req, res) => {
  try {
    // Get user ID from JWT token (set by auth middleware)
    const userId = req.user.id;
    
    // Create account with user ID from token
    const account = await Account.create({
      ...req.body,
      id_user: userId
    });

    res.status(201).json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json({
      success: true,
      data: accounts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single account
exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }
    res.status(200).json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add new method to get account by user_id
exports.getAccountByUserId = async (req, res) => {
  try {
    const account = await Account.findOne({
      where: { id_user: req.params.userId }
    });
    
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found for this user'
      });
    }

    res.status(200).json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update account
exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }
    await account.update(req.body);
    res.status(200).json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }
    await account.destroy();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};