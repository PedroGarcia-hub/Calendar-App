const { response } = require('express');

/**
 * Function for /new to create user
 * @param {Request} req
 * @param {Response} res
 * @returns Server response
 */
const createUser = (req, res = response) => {
  const { name, email, password } = req.body;

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
