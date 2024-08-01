const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    _id: String,
    customer: {
      type: String,
      required: true,
    },
    workouts: {
      type: [String],
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` timestamps automatically
);

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order; // Export the Order model