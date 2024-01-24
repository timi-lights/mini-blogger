import { Request } from 'express';
import { User } from '@interfaces/users.interface';
import { Types } from 'mongoose';

export interface DataStoredInToken {
  _id: Types.ObjectId;
}

export interface TokenData {
  token: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
