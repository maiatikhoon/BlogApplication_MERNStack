const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email: email });

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  if (!user) {
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, "randomesecret");

    return res.json({
      user: newUser,
      token: token,
    });
  } else {
    return res.status(500).send("user already exists");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(500).send("user doesn't exists!");
  }

  const isPasswordMatchedFromDb = await bcrypt.compare(password, user.password);

  if (isPasswordMatchedFromDb) {
    const token = jwt.sign({ id: user._id }, "randomsecret");

    return res.status(200).json({
      user: user,
      token: token,
    });
  } else {
    res.status(404).send("incorrect login crediantials ");
  }
};

module.exports = { registerUser, loginUser };
