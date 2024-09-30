const User = require('../models/userModel');

exports.getApprovedStartups = async (req, res) => {
  try {
    const startups = await User.find({ role: 'startup', applicationStatus: 'approved' });
    res.status(200).json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching approved startups', error: error.message });
  }
};

exports.getStartupDashboard = async (req, res) => {
  try {
    const startup = await User.findById(req.user._id);
    if (!startup || startup.role !== 'startup') {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.status(200).json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching startup dashboard', error: error.message });
  }
};

exports.updateStartupProfile = async (req, res) => {
  try {
    const { businessDescription, documents } = req.body;
    const startup = await User.findByIdAndUpdate(
      req.user._id,
      { businessDescription, documents },
      { new: true }
    );
    res.status(200).json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Error updating startup profile', error: error.message });
  }
};