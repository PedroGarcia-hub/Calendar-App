const jwt = require('jsonwebtoken');

/**
 * Function to generate a json web token
 * @param {String} uid User id
 * @param {String} name User name
 */
const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('Can not generate JWT');
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
