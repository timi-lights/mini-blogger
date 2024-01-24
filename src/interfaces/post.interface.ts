import { Types } from 'mongoose';

export interface Post {
  author: Types.ObjectId;
  title: string;
  content: string;
}
