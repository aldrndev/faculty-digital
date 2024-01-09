const { Product, User } = require('../models');

module.exports = {
  fetchProduct: async (req, res, next) => {
    try {
      //get data
      const getData = await Product.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          },
        ],
      });

      //validate if no product found
      if (getData.length === 0) {
        return res.status(200).json({
          message: 'No product found in database',
        });
      }

      res.status(200).json({
        message: 'Success product data from database',
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },
};
