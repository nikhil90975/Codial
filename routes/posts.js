const express = require('express');
const router = express.Router();
//authenticate for posting
const passport = require('passport')
//fetch post

const postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports = router;