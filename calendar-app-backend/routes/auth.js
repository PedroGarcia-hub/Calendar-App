/**
 * User routes / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');

const router = Router();

router.post(
  '/',
  [check('email', 'Email must be a email type').isEmail()],
  [
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
  ],
  loginUser
);

/**
 * Endpoint /new for register with validations
 */
router.post(
  '/new',
  [check('name', 'Name can not be undefined').not().isEmpty()],
  [check('email', 'Email must be a email type').isEmail()],
  [
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
  ],
  createUser
);

router.get('/renew', renewToken);

module.exports = router;
