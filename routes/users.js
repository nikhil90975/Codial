const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/usersController');

console.log('users loaded');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.post('/create',usersController.create);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
),usersController.createsession);


router.get('/signout',usersController.destroySession);

//google sign in
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/signin'}),usersController.createsession);






module.exports = router;