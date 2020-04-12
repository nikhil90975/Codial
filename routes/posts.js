const express = require('express');
const router = express.Router();
//authenticate for posting
const passport = require('passport')
//fetch post

const postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/delete-post',postController.delete);

module.exports = router;