import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  totalAmount: number; // in Cent
  stripePaymentIntentId: string;
  status: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    totalAmount: { type: Number, required: true },
    stripePaymentIntentId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Order || model<IOrder>("Order", OrderSchema);
