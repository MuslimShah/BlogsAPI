const User = require("../models/user");
const { BadRequest, unAuthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { put } = require("@vercel/blob");

//registering user
exports.register = async (req, res) => {
  const user = await User.create({ ...req.body });
  console.log({ ...req.body });
  const token = await user.createToken();
  res.status(StatusCodes.CREATED).json({ token, name: user.name });
};

//login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest(`invalid credintials`);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new unAuthenticatedError(`Invalid credintials`);
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    throw new unAuthenticatedError("Invalid credintials");
  }
  //sending token to user...
  const token = await user.createToken();
  res.status(StatusCodes.OK).json({
    token,
    name: user.name,
    msg: `user ${user.name} successfully logged in`,
  });
};

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    const blob = await put(file.originalname, file.buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.status(200).json({
      imageUrl: blob.url,
      message: "File uploaded successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
};
