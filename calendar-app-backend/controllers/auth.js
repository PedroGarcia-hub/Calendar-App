const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

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

    // Generate Token
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Can not create user',
    });
  }
};
//
/**
 * Function for / endpoint to login user
 * @param {Request} req
 * @param {Response} res
 * @returns Server response
 */
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User do not exist',
      });
    }

    // Confirm password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Wrong password',
      });
    }

    // Generate Token
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Can not login',
    });
  }
};

/**
 * Function for /renew endpoint to renew session token
 * @param {Request} req
 * @param {Response} res
 * @returns Server response
 */
const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // Refresh token
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
