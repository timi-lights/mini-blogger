import { User } from '@interfaces/users.interface';
import { model, Schema, Types } from 'mongoose';
import userModel from './users.model';
import { Post } from '@/interfaces/post.interface';

const postSchema: Schema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: userModel,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const postModel = model<Post>('Post', postSchema);

export default postModel;
