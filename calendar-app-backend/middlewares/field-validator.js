const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Custom middleware to validate fields
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns HTTP Response
 */
const validateField = (req, res = response, next) => {
  // Error management and validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validateField,
};
