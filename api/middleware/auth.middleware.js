const jwt = require('jsonwebtoken');
const userModel = require('../user/user.model');
exports.tokenMiddleware = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  const token = authorizationHeader.replace('Bearer ', '');
  console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'Not authorized' });
  }
  try {
    const id = "5f464e4a4c3a185c98de37e0";
    const user = await userModel.findById(id);
    if (!user || user.token !== token) {
      res.status(401).send('Invalid token');
    }
    console.log(user)
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
