const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //   console.log(token);

  if (token) {
    jwt.verify(token, 'nabeel', (err, decoded) => {
      if (err) {
        res.status(400).send({ 'Error ': err.message, success: false });
      } else {
        // console.log(decoded);
        next();
      }
    });
  } else {
    res.send({ message: 'Redirected to Sign In Page' });
    next();
  }
};

module.exports = { requireAuth };
