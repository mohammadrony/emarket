const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const storagePath = "./public/uploads/";
    fs.mkdirSync(storagePath, { recursive: true });
    
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image Upload Problem"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
}).array("imageField", 10);

module.exports = {
  async uploadProductImage(req, res, next) {
    try {
      // what is actual code
      await upload(req, res, function (err) {
        if (err) {
          return res.send("An error occured on uploading images");
        } else {
          next();
        }
      });
    } catch (error) {
      res.status(500).send({
        error: "An error2 occured when uploading product image.",
      });
    }
  },
};
