const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const {
  loginValidator,
  registerValidator,
} = require("../utils/req-validators");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  //validating req field
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check for existing users
  try {
    const result = await User.findOne({ email });
    if (result) {
      return res.status(400).json({
        error: "User already exists",
      });
    } else {
      //create new user
      const newemail = email.toLowerCase();
      const user = new User({
        name,
        email: newemail,
        password,
      });
      //hasing user password to store in db
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      //save user
      await user.save();
      return res.status(200).json({
        message: "success",
      });
    }
  } catch (error) {
    res.json(error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  //validation login input fields
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check for user in database
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).send("Invalid email or password.");

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");
    //generate token
    const token = user.generateAuthToken();
    //send token as response
    res.send(token);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
