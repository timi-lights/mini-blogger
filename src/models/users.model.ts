import { User } from '@interfaces/users.interface';
import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const userModel = model<User>('User', userSchema);

export default userModel;
