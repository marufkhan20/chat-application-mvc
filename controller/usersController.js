// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../models/People");

// get login controller
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users", { users });
  } catch (err) {
    next(err);
  }
};

// add new user controller
const addUser = async (req, res) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    const result = await newUser.save();
    res.status(201).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

// remove user controller
const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({ message: "User was remove successfully!!" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
};
