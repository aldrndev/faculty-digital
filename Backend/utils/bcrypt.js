const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: (password) => bcrypt.hashSync(password),
  comparePassword: (password, hashPwd) => {
    return bcrypt.compareSync(password, hashPwd);
  },
};
