const User = require('../models/Users');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send(users);
};

// handle error

// const handleError = (error) => {
//   //validation
//   if (error.message.includes('Users validation failed')) {
//     const message = Object.values(error.errors).forEach(({ properties }) => {
//       console.log(message);
//     });
//   }
// };

// create token

const createToken = (id) => {
  return jwt.sign({ id }, 'nabeel', { expiresIn: 3600 });
};

//signUp user

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
   
    if (!email) {
      res
        .status(400)
        .send({ message: 'Requested Data is not Provided', success: false });
    } else {
      const existingEmail = await User.findOne({ email: email });
      if (!existingEmail) {
        // res.cookie(email, true, { maxAge: 6000, httpOnly: true });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        user.save();
        res.status(200).send({
          message: 'User account has been created successfully',
          success: true,
        });
      } else {
        res.status(400).send({
          message: 'User with this email already exists, Please try again',
          success: false,
        });
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};
// Signin User

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!email || !password) {
      res
        .status(400)
        .send({ message: 'Requested Data is not Provided', success: false });
    } else {
      if (!user) {
        res.status(400).send({
          message: 'User with these credentials does not exist',
          success: false,
        });
      } else {
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        const data = bcrypt.compareSync(password, user.password);
        if (data) {
          res.status(200).send({
            message: 'User Logged In successfully',
            success: true,
          });
        } else {
          res
            .status(400)
            .send({ message: 'Invaliad Credentials', success: true });
        }
      }
    }
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const cartAccess = async (req, res, next) => {
  const { email } = req.body;
  const authorizationHeader = req.headers.authorization;
  // console.log(authorizationHeader);
  const tokenFromHeader = authorizationHeader.split(' ')[1];
  // console.log(tokenFromHeader);

  try {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      res.status(401).send({ message: 'Unauthorized', success: false });
    } else {
      const decodedToken = jwt.verify(tokenFromHeader, 'nabeel');
      const user = await User.findOne({ email: email });
      if (JSON.stringify(decodedToken.id) === JSON.stringify(user._id)) {
        res.send({ message: 'User has now access to the cart', success: true });
        // res.redirect('/');
        next();
      }
    }
  } catch (err) {
    res.status(400).send({ message: 'Unauthorized', success: false });
  }
};

module.exports = { getAllUsers, signUpUser, signInUser, cartAccess };
