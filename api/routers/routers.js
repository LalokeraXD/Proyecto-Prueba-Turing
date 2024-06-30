const express = require('express');
const router = express.Router();
const authenticateAndAuthorize = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const quoteController = require('../controllers/quoteController');

// User routers
router.get('/users', userController.getAllUsers);
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.put('/users/update', authenticateAndAuthorize(['admin', 'user']), userController.updatePassword);
router.delete('/users/:username', authenticateAndAuthorize(['admin', 'user']), userController.deleteUser);

// Article routers
router.get('/articles', articleController.getAllArticles);
router.post('/articles/add', authenticateAndAuthorize(['admin']), articleController.createArticle);
router.put('/articles/:id', authenticateAndAuthorize(['admin']), articleController.updateArticleById);
router.delete('/articles/:id', authenticateAndAuthorize(['admin']), articleController.deleteArticleById);

// Quote routers
router.get('/quotes', quoteController.getAllQuotes);
router.post('/quotes/add', authenticateAndAuthorize(['admin']), quoteController.createQuote);
router.put('/quotes/:id', authenticateAndAuthorize(['admin']), quoteController.updateQuoteById);
router.delete('/quotes/:id', authenticateAndAuthorize(['admin']), quoteController.deleteQuoteById);

module.exports = router;
