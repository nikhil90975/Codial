const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const postsController = require('../controllers/posts');

console.log('users loaded');
router.get('/profile',usersController.profile);
router.get('/posts',postsController.posts);


module.exports = router;