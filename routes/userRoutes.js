const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/getuser/:id", auth.auth, userController.getuser);

userRouter.get("/getallusers", auth.auth, userController.getallusers);

userRouter.get("/admin-data", auth.auth, auth.adminAuth, userController.getuser);

userRouter.get("/govt-data", auth.auth, auth.governmentAuth, userController.getuser);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

userRouter.put("/updateprofile", auth.auth, userController.updateprofile);

userRouter.delete("/deleteuser", auth.auth, userController.deleteuser);

module.exports = userRouter;
