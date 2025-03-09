const mongoose = require("mongoose");

const connectionRequest = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

const connectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequest
);
