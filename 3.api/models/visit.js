const mongoose = require("mongoose");

const Visit = mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  visitorName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  doctorName: {
    type: String,
    required: true
  },
  visitDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visit", Visit);
