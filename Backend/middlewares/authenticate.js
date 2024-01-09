const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      return next(new Error('unauthorized'));
    }

    const verify = verifyToken(access_token);

    const checkUser = User.findByPk(verify.id);

    if (!checkUser) {
      return next(new Error('unauthorized'));
    }

    req.user = verify;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authenticate;
