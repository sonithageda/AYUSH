const User = require('../models/userModel');

const getStartupApplications = async (req, res) => {
  try {
    const applications = await User.find({ role: 'startup', isApproved: false }).select("-password");
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching startup applications:", error); 
    res.status(500).json({ message: "Unable to get startup applications" });
  }
};

const getGovernmentOfficials = async (req, res) => {
  try {
    const officials = await User.find({ role: 'government_official'}).select("-password");
    res.status(200).json(officials);
  } catch (error) {
    res.status(500).json({ message: "Unable to get government officials" });
  }
};

const approveStartup = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, { isApproved: true, applicationStatus: 'approved' });
    res.status(200).json({ message: "Startup approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable to approve startup" });
  }
};


/*const rejectStartup = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { applicationStatus: 'rejected' });
    res.json({ message: "Startup rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable to reject startup" });
  }
};*/


const rejectStartup = async (req, res) => {
  try {
    const { userId, rejectionReason } = req.body;
    await User.findByIdAndUpdate(userId, { applicationStatus: 'rejected', rejectionReason :rejectionReason});
    return res.status(200).send("Startup application rejected");
  } catch (error) {
    res.status(500).send("Unable to reject startup application");
  }
};

const approveGovernmentOfficial = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, { isApproved: true });
    res.json({ message: "Government official approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable to approve government official" });
  }
};

/*
const approveGovernmentOfficial = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user || user.role !== 'government_official') {
      return res.status(404).send("Government official not found");
    }
    user.isApproved = true;
    await user.save();
    return res.status(200).send("Government official approved successfully");
  } catch (error) {
    res.status(500).send("Unable to approve government official");
  }
};*/

module.exports = {
  getStartupApplications,
  getGovernmentOfficials,
  approveStartup,
  rejectStartup,
  approveGovernmentOfficial,
};