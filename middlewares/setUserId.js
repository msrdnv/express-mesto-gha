module.exports.setUserId = (req, res, next) => {
  req.user = {
    _id: '64f358b939b9fc4d6062d897',
  };

  next();
};
