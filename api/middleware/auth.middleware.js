const jwt = require('jsonwebtoken');
const userModel = require('../user/user.model');
exports.tokenMiddleware = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  const token = authorizationHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Not authorized' });
  }
  const decodeToken = jwt.verify(token, process.env.SECRET);
  const isTokenTimeOut = decodeToken.exp <= decodeToken.iat;
  try {
    const user = await userModel.findById(decodeToken.id);
    if (!user || isTokenTimeOut) {
      res.status(401).send('Invalid token');
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
