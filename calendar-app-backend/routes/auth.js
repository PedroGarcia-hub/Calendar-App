/**
 * User routes / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/field-validator');
const { JWTValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.post(
  '/',
  [
    check('email', 'Email must be a email type').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
    validateField,
  ],
  loginUser
);

/**
 * Endpoint /new for register with validations
 */
router.post(
  '/new',
  [
    check('name', 'Name can not be undefined').not().isEmpty(),
    check('email', 'Email must be a email type').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
    validateField,
  ],
  createUser
);

router.get('/renew', JWTValidator, renewToken);

module.exports = router;
