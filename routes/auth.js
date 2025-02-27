const express = require("express");
const { register, login, uploadImage } = require("../contollers/auth");
const router = express.Router();
const multer = require("multer");
// Configure Multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

//POST==>REGISTERING USER
router.post("/register", register);
//POST ==>LOGIN USER
router.post("/login", login);
router.post("/upload", upload.single("image"), uploadImage);
module.exports = router;
