// external imports
const express = require("express");
const { check } = require("express-validator");

// internal imports
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

// users page
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

// add user
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", checkLogin, removeUser);

module.exports = router;
