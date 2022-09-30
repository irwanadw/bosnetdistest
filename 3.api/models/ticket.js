const mongoose = require("mongoose");

const Ticket = mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  isBpjs: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default : true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Ticket", Ticket);
