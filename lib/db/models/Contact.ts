import { Schema, model, models, type Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    message: { type: String, required: true },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Contact || model<IContact>("Contact", ContactSchema);
