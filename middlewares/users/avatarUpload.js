// internal imports
const uploader = require("../../utils/singleUploader");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatar",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpeg .jpg or .png format allowed!"
  );

  //   call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
