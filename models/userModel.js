const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['startup', 'government_official', 'Stakeholder or other'],
      default: 'Stakeholder or other',
    },
    isApproved: {
      type: Boolean,
      default: function() { 
        return this.role === 'Stakeholder or other';
      },
    },

    //start-up fields 
    ayushCategory: {
      type: String,
      enum: ['Ayurveda', 'Yoga', 'Naturopathy', 'Unani', 'Siddha', 'Homoeopathy'],
      required: function() { return this.role === 'startup'; },
    },
    documents: [{
      name: String,
      url: String,
      uploadDate: Date,
    }],  
    applicationStatus: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
      default: '',
    },
    businessDescription: {
      type: String,
    },
  
    //others fields
    userType: {
      type: String,
      enum: ['investor', 'incubator', 'public', 'other'],
      required: function() { return this.role === 'Stakeholder or other'; },
    },
    department: {
      type: String,
      required: function() { return this.role === 'government_official'; },
    },
    mobile: {
      type: Number,
      default: "",
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schema);

module.exports = User;
