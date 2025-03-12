const express = require("express");
const { UserAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  UserAuth,
  async (req, res) => {
    const status = req.params.status;
    const fromUserId = req.user.id;

    const toUserId = req.params.toUserId;

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Please Enter Valid Status :" });
    } //Checking if the status entered by user is valid or Not:

    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).send("Connection Request Already Exists");
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      res.status(400).send("User Not Found");
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message:
        req.user.firstName +
        " " +
        "is" +
        " " +
        status +
        " " +
        " in " +
        toUser.firstName,
      data,
    });
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  UserAuth,
  async (req, res) => {
    try {
      const { requestId, status } = req.params;
      const loggedInUser = req.user;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        res.status(400).send("Status is Not Allowed Please Enter Valid Status");
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        res.status(400).send("Connection Not Found");
      }
      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: `Request ${status} `, data });
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  }
);

module.exports = {
  requestRouter,
};
