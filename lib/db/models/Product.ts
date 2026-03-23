import { Schema, model, models, type Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number; // in Cent, z.B. 1200 = 12,00 €
  images: string[]; // Uploadthing URLs
  videoUrl?: string; // Uploadthing URL (Produktvideo)
  downloadFile?: string; // Uploadthing URL (nur für digitale Produkte)
  category: string;
  categories: string[];
  subcategory?: string;
  tags: string[];
  featured: boolean;
  includedInSubscription: boolean;
  published: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true, min: 0 },
    images:      [{ type: String }],
    videoUrl:    { type: String },
    downloadFile:{ type: String },
    category:    { type: String, required: true },
    categories:  [{ type: String }],
    subcategory: { type: String },
    tags:        [{ type: String }],
    featured:    { type: Boolean, default: false },
    includedInSubscription: { type: Boolean, default: false },
    published:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Product || model<IProduct>("Product", ProductSchema);
