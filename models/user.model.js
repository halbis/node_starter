const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 16,
    },
    email: {
      type: String,
      required: true,
      uniqure: true,
      maxLength: 20,
      minLength: 8,
    },
    password: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 8,
    },
    label: {
      type: String,
      default: "user", //label: admin,user
    },
  },
  { timestamps: true }
);

//method to generate token
userSchema.methods.generateToken = function () {
  //@params for jwt- properties,jwtsecretkey,expirytime
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      label: this.label,
    },
    process.env.JWTSECRET_KEY,
    { expiresIn: 2 * 60 * 60 }
  );
  return token;
};

//exporting user model
module.exports = new mongoose.model("User", userSchema);
