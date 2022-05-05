const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * Function for /new endpoint to create user
 * @param {Request} req
 * @param {Response} res
 * @returns Server response
 */
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already exists',
      });
    }

    user = new User(req.body);

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Can not create user',
    });
  }
};

/**
 * Function for / endpoint to login user
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
 * Function for /renew endpoint to renew session token
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
