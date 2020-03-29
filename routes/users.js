const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const postsController = require('../controllers/posts');

console.log('users loaded');
router.get('/profile',usersController.profile);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.get('/posts',postsController.posts);
router.post('/create',usersController.create);
router.post('/create-session',usersController.createsession);
router.get('/signout',usersController.signout);
module.exports = router;