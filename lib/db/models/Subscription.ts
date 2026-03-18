import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  status: "active" | "cancelled" | "past_due" | "trialing";
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId:               { type: Schema.Types.ObjectId, ref: "User", required: true },
    stripeSubscriptionId: { type: String, required: true, unique: true },
    stripeCustomerId:     { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "cancelled", "past_due", "trialing"],
      required: true,
    },
    currentPeriodEnd: { type: Date, required: true },
    cancelAtPeriodEnd: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Subscription || model<ISubscription>("Subscription", SubscriptionSchema);
