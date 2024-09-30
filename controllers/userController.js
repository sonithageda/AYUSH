const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find()
      .find({ _id: { $ne: req.locals } })
      .select("-password");
    return res.send(users);
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const uploadDocument = async (req, res) => {
  try {
    const { userId, documentName, documentUrl } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.documents.push({
      name: documentName,
      url: documentUrl,
      uploadDate: new Date(),
    });
    await user.save();
    return res.status(200).send("Document uploaded successfully");
  } catch (error) {
    res.status(500).send("Unable to upload document");
  }
};

const getApprovedStartups = async (req, res) => {
  try {
    const startups = await User.find({ role: 'startup', isApproved: true }).select("-password");
    return res.send(startups);
  } catch (error) {
    res.status(500).send("Unable to get approved startups");
  }
};

const getGovernmentOfficials = async (req, res) => {
  try {
    const officials = await User.find({ role: 'government_official' }).select("-password");
    return res.send(officials);
  } catch (error) {
    res.status(500).send("Unable to get government officials");
  }
};


const login = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (!emailPresent) {
      return res.status(400).send("Incorrect credentials");
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      emailPresent.password
    );
    if (!verifyPass) {
      return res.status(400).send("Incorrect credentials");
    }
    const user = await User.findOne({ email: req.body.email });
    let message = "User logged in successfully";
    
    if (user.role === 'government_official' && !user.isApproved) {
      message = "Logged in successfully. Your government official account is pending approval.";
    }
    const token = jwt.sign(
      { userId: emailPresent._id, isAdmin: emailPresent.isAdmin, role: user.role,isApproved:user.isApproved  },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    return res.status(201).send({ msg: message, token,role: user.role, isApproved: user.isApproved });
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
};

const register = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (emailPresent) {
      return res.status(400).send("Email already exists");
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = await User({ 
      ...req.body,
       password: hashedPass,
       isApproved: req.body.role !== 'government_official' && req.body.role !== 'startup'
    });
    console.log(user)
    const result = await user.save();
    if (!result) {
      return res.status(500).send("Unable to register user");
    }
    return res.status(201).send("User registered successfully.");
  } catch (error) {
    console.log(error)
    res.status(500).send("Unable to register user");
  }
};

const updateprofile = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body, password: hashedPass }
    );
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

const deleteuser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.body.userId);
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  uploadDocument,
  getApprovedStartups,
  getGovernmentOfficials,
  login,
  register,
  updateprofile,
  deleteuser,
};
