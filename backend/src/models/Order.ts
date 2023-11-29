import mongoose, { Schema, Model, model, ObjectId } from "mongoose";

const OrderSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  orderPO: {
    type: Number,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  factory: {
    type: String,
    required: true,
  },
  completionDate: {
    type: Date,
    default: Date.now
  },
  readyDate: {
    type: Date,
    default: Date.now
  }
});
const Order = model("Order", OrderSchema);

export default Order;