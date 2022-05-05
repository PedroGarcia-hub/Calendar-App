const { response } = require('express');
const jwt = require('jsonwebtoken');

/**
 * Middleware to validate Json Web Token
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const JWTValidator = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token can not be null',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Not valid token',
    });
  }
  next();
};

module.exports = {
  JWTValidator,
};
