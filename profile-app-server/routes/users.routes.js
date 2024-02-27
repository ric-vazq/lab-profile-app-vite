const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

router.get('/users', isAuthenticated, async (req, res, next) => {
  try {
    console.log('user route: ', req.payload);
    const userData = await User.findById(req.payload._id);
    const { _id, username, campus, course, image } = userData;
    const user = { _id, username, campus, course, image };
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/upload', fileUploader.single('image'), (req, res, next) => {
  console.log('file is: ', req.file);
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.status(200).json({ fileUrl: req.file.path });
});

router.put('/users', async (req, res, next) => {

})

module.exports = router;
