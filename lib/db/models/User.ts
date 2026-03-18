import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  stripeCustomerId?: string;
  purchases: mongoose.Types.ObjectId[];
  subscriptionStatus: "none" | "active" | "cancelled" | "past_due";
  subscriptionId?: string;
  subscriptionEnd?: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name:             { type: String, required: true, trim: true },
    email:            { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash:     { type: String, required: true },
    role:             { type: String, enum: ["user", "admin"], default: "user" },
    stripeCustomerId: { type: String },
    purchases:        [{ type: Schema.Types.ObjectId, ref: "Product" }],
    subscriptionStatus: {
      type: String,
      enum: ["none", "active", "cancelled", "past_due"],
      default: "none",
    },
    subscriptionId:  { type: String },
    subscriptionEnd: { type: Date },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
