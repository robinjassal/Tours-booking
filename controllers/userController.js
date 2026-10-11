const AppError = require('../appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this is not yet defined',
  });
};

const updateMe = catchAsync(async (req, res, next) => {
  //create error post password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update', 400));
  }
  //update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  // 204 = No Content, so no body is sent
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this is not yet defined',
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
};
