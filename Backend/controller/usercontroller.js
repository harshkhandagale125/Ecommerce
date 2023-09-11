const User = require("../model/Users");
const OtpModel = require("../model/otpModel");
const bycrypt = require("bcrypt");
const { creatAuthToken } = require("../utils/auth");
const mailSender = require("../config/mailerconfig");
const otpModel = require("../model/otpModel");

const registerUser = async (req, res) => {
  try {
    const { username, email, phonenumber, password } = req.body;

    if (!username || !email || !phonenumber || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bycrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      phonenumber,
      password: hashedPassword,
      role: "user",
      is_active: true,
    });
    await user.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (user.is_active == false) {
      return res.status(400).json({ error: "Contact admin not active!" });
    }

    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "email or password incorrect" });
    }

    const token = await creatAuthToken(email, user.role, user._id);

    res.status(200).json({ message: "Logged In successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phonenumber } = req.body;

    // Find the user by ID
    const user = await User.findByIdAndUpdate(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("jwtt");
  res.send("Logged out");
};

const sendEmailForVerification = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(req.body)
    const userEmail = await User.findOne({ email }, { email: 1 });
    if (!userEmail) {
      return res.status(404).json({
        result: false,
        msg: "User not found!",
      });
    }

    const otpCode = await Math.floor(1000 + Math.random() * 9000);

    const otpData = await OtpModel.findOne({ email: userEmail });
    if (otpData) {
      await otpModel.updateOne(
        { email: userEmail.email },
        { $set: { otp: otpCode, expiresIn: new Date().getTime() + 300 * 1000 } }
      );
      await mailSender(userEmail, otpCode);

      return res.status(200).json({
        result: true,
        msg: "Otp sent to your mail",
      });
    } else {
      await OtpModel.create({
        email: userEmail.email,
        otp: otpCode,
        expiresIn: new Date().getTime() + 300 * 1000,
      });

      await mailSender(userEmail, otpCode);

      return res.status(200).json({
        result: true,
        msg: "Otp sent to your mail",
      });
    }
  } catch (err) {
    console.log("err",err);
    res.status(500).json({ err: "Internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let { email } = req.body;
    
    let { otp } = req.body;
    const otpData = await otpModel.findOne({ email });
    if (!otpData) {
      return res.status(500).json({
        msg: "Invalid!",
        result: false,
      });
    }
    let currentTime = new Date().getTime();
    let diff = otpData.expiresIn - currentTime;

    // Check if Otp is expired
    if (diff < 0) {
      await otpModel.deleteOne({ email });
      return res.status(500).json({
        msg: "OTP expired!",
        result: false,
      });
    }

    // Check otp is valid or not
    if (otp != otpData.otp) {
      await otpModel.deleteOne({ email });
      return res.status(500).json({
        msg: "Invalid OTP!",
        result: false,
      });
    }

    await otpModel.deleteOne({ email });
    return res.status(200).json({
      msg: "OTP verified!",
      result: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Internal server erroe",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    let { newPassword,confirmPassword } = req.body;
    console.log(req.body)

    if(newPassword != confirmPassword){
      return res.status(403).json({
        result: false,
        msg:"Password does not match!"
      })
    }

    const hashedPassword = await bycrypt.hash(newPassword, 12);

    const userData = await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    if (!userData) {
      return res.status(500).json({
        msg: "Unable to change the password",
        result: false,
      });
    }

    return res.status(200).json({
      result: true,
      msg: "Password changed successfully",
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Internal server erroe",
    });
  }
};

module.exports = {
  registerUser,
  login,
  updateUser,
  deleteUser,
  logout,
  sendEmailForVerification,
  resetPassword,
  verifyOtp
};
