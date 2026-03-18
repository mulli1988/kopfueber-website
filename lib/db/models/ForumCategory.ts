import { Schema, model, models, type Document } from "mongoose";

export interface IForumCategory extends Document {
  name: string;
  slug: string;
  description: string;
  order: number;
}

const ForumCategorySchema = new Schema<IForumCategory>({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  order:       { type: Number, default: 0 },
});

export default models.ForumCategory || model<IForumCategory>("ForumCategory", ForumCategorySchema);
