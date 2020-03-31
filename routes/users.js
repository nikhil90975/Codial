const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/usersController');
const postsController = require('../controllers/posts');

console.log('users loaded');
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.get('/posts',postsController.posts);
router.post('/create',usersController.create);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
),usersController.createsession);
router.get('/signout',usersController.destroySession);
module.exports = router;