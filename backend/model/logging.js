const mongoose = require("mongoose");

const requestLogSchema = new mongoose.Schema(
  {
    api: {
      type: String,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    method: {
      type: String,
      required: true
    },

    path: {
      type: String,
      required: true
    },

	type: {
      type: String,
      required: true
    },

    status: {
      type: Number,
      required: true
    },

    responseTime: {
      type: Number,
      required: true
    },

    ip: {
      type: String,
      required: true
    },

    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("RequestLog", requestLogSchema);
