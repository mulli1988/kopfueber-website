import { Schema, model, models, type Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  rating: number;
  text: string;
  approved: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name:     { type: String, required: true, trim: true },
    rating:   { type: Number, required: true, min: 1, max: 5 },
    text:     { type: String, required: true, trim: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Review || model<IReview>("Review", ReviewSchema);
