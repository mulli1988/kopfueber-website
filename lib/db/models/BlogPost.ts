import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string; // Markdown
  excerpt: string;
  coverImage?: string; // Uploadthing URL
  authorId: mongoose.Types.ObjectId;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title:      { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, lowercase: true },
    content:    { type: String, required: true },
    excerpt:    { type: String, required: true },
    coverImage: { type: String },
    authorId:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags:       [{ type: String }],
    published:  { type: Boolean, default: false },
    publishedAt:{ type: Date },
  },
  { timestamps: true }
);

export default models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);
