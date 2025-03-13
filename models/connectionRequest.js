const mongoose = require("mongoose");

const connectionRequest = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUE} is incorrect Status Type`,
    },
  },
});

connectionRequest.pre("save", function (next) {
  const connectionR = this;

  if (connectionR.fromUserId.equals(connectionR.toUserId)) {
res.status("Can-Not send Connection Request to Your-Self");
  }

  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequest
);

module.exports = {
  ConnectionRequestModel,
};
