const { User } = require('../models');
const { comparePassword } = require('../utils/bcrypt');
const { createToken } = require('../utils/jwt');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      //check if email/password available
      if (!email || !password) {
        return next(new Error('invalid_credential'));
      }

      //check user
      const validateUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!validateUser) {
        return next(new Error('invalid_credential'));
      }

      //check password
      if (!comparePassword(password, validateUser.password)) {
        return next(new Error('invalid_credential'));
      }

      //create payload for token
      const payload = {
        id: validateUser.id,
        name: validateUser.name,
        email: validateUser.email,
      };

      //sign token
      const signToken = createToken(payload);

      res.status(200).json({
        message: `Welcome back ${validateUser.name}`,
        access_token: signToken,
        name: validateUser.name,
        email: validateUser.email,
      });
    } catch (error) {
      next(error);
    }
  },
};
