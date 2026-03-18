import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IForumPost extends Document {
  threadId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  content: string;
  isFirstPost: boolean; // Der erste Post = eigentlicher Thread-Inhalt
  createdAt: Date;
  updatedAt: Date;
}

const ForumPostSchema = new Schema<IForumPost>(
  {
    threadId:    { type: Schema.Types.ObjectId, ref: "ForumThread", required: true },
    authorId:    { type: Schema.Types.ObjectId, ref: "User", required: true },
    content:     { type: String, required: true },
    isFirstPost: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.ForumPost || model<IForumPost>("ForumPost", ForumPostSchema);
