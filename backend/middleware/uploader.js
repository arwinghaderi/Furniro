const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.multerStorage = (destination, allowedTypes = /jpg|png|jpeg|webp/) => {
  destination = path.join(__dirname, "..", destination);

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      const filename = Date.now() + Math.floor(Math.random() * 1e9);
      cb(null, `${filename}${extname}`);
    },
  });

  const fileFilter = function (req, file, cb) {
    if (allowedTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"));
    }
  };

  const uploader = multer({
    storage,
    limits: {
      fileSize: 512_000_000, // 5MB
    },
    fileFilter,
  });

  return uploader;
};
