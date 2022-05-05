const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Function for /new to create user
 * @param {Request} req
 * @param {Response} res
 * @returns Server response
 */
const createUser = (req, res = response) => {
  const { name, email, password } = req.body;

  // Error management and validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  res.status(201).json({
    ok: true,
    msg: 'register',
    name,
    email,
    password,
  });
};

/**
 * Function for / to login user
 * @param {Request} req
 * @param {Response} res
 * @returns Server response
 */
const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  res.status(200).json({
    ok: true,
    msg: 'login',
    email,
    password,
  });
};

/**
 * Enpoint to renew token
 * @param {Request} req
 * @param {Response} res
 * @returns Server response
 */
const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
