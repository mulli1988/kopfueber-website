import { Schema, model, models, type Document } from "mongoose";

export interface IForumCategory extends Document {
  name: string;
  slug: string;
  description: string;
  section: "kita" | "eltern";
  order: number;
}

const ForumCategorySchema = new Schema<IForumCategory>({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  section:     { type: String, enum: ["kita", "eltern"], required: true },
  order:       { type: Number, default: 0 },
});

export default models.ForumCategory || model<IForumCategory>("ForumCategory", ForumCategorySchema);
