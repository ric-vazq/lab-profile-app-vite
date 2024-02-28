const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isAuthenticated }  = require('../middleware/jwt.middleware');
const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.json('All good in here');
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, campus, course, image } = req.body;

    if (username === '' || password === '' || campus === '' || course === '') {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          'Password must have at least 8 characters and contain at least one number, one lowercase and one uppercase letter.',
      });
      return;
    }

    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    } else {
      const salt = await bcrypt.genSaltSync(saltRounds);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      const createdUser = await User.create({
        username,
        password: hashedPassword,
        course,
        campus,
        image,
      });
      const user = { username, _id: createdUser._id, campus, course };
      // console.log(user);
      return res.status(201).json({ user: user });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username === '' || password === '') {
      res.status(400).json({ message: 'Provide username and password.' });
      return;
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      res.status(401).json({ message: 'User not found.' });
      return;
    }

    const passwordCorrect = await bcrypt.compareSync(
      password,
      foundUser.password
    );

    if (passwordCorrect) {
      const { _id } = foundUser;
      //console.log(foundUser);
      const payload = { _id, username: foundUser.username};
      // console.log(payload);
      const authToken = jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        {
        algorithm: 'HS256',
        expiresIn: '6h',
      });
      res.status(200).json({ authToken: authToken });
    } else {
      res.status(401).json({ message: 'Unable to authenticate the user' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/verify', isAuthenticated, async (req, res, next) => {
  try {
    // console.log('req.payload', req.payload);
    res.status(200).json(req.payload);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
