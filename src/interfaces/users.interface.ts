import { Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  full_name: string;
  email: string;
  password: string;
}
