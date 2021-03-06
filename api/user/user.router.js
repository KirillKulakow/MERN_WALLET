const { Router } = require('express');
const router = Router();
const UserController = require('./user.controller');
const { tokenMiddleware } = require('../middleware/auth.middleware');

router.get('/', tokenMiddleware, UserController.getUser);


exports.userRouter = router;