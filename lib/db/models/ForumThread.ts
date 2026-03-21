import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IForumThread extends Document {
  categorySlug: string;
  title: string;
  slug: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  replyCount: number;
  pinned: boolean;
  locked: boolean;
  createdAt: Date;
  lastReplyAt: Date;
}

const ForumThreadSchema = new Schema<IForumThread>(
  {
    categorySlug: { type: String, required: true },
    title:        { type: String, required: true, trim: true },
    slug:         { type: String, required: true },
    content:      { type: String, required: true },
    authorId:     { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorName:   { type: String, required: true },
    replyCount:   { type: Number, default: 0 },
    pinned:       { type: Boolean, default: false },
    locked:       { type: Boolean, default: false },
    lastReplyAt:  { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ForumThreadSchema.index({ categorySlug: 1, slug: 1 }, { unique: true });

export default models.ForumThread || model<IForumThread>("ForumThread", ForumThreadSchema);
