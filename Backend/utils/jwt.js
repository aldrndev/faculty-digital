const jwt = require('jsonwebtoken');

const secretKey = 'facultydigitalassesment';

module.exports = {
  createToken: (payload) => jwt.sign(payload, secretKey),
  verifyToken: (token) => jwt.verify(token, secretKey),
};
