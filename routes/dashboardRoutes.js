const express = require("express");
const auth = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");
const dashboardRouter = express.Router();

dashboardRouter.get("/getStartupApplications", auth.auth, auth.approvalAuth,dashboardController.getStartupApplications);

dashboardRouter.post("/approveStartup", auth.auth, auth.approvalAuth,dashboardController.approveStartup);

dashboardRouter.post("/rejectStartup", auth.auth, auth.approvalAuth,dashboardController.rejectStartup);

dashboardRouter.post("/approveGovernmentOfficial", auth.auth, auth.adminAuth, dashboardController.approveGovernmentOfficial);

dashboardRouter.get("/getGovernmentOfficials", auth.auth, auth.adminAuth, dashboardController.getGovernmentOfficials);

module.exports = dashboardRouter;
