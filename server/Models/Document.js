const mongoose = require("mongoose");

const docsSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Object,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", docsSchema);
