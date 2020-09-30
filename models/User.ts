import mongoose, { Schema, Document } from "mongoose";
import { isEmail } from "validator";
// import { generatePasswordHash } from "../../backend-chat-tutorial-master/src/utils";
// import differenceInMinutes from "date-fns/difference_in_minutes";

export interface IUser extends Document {
  email: string;
  password: string;
  data?: IUser;
  _id: string;
  admin: boolean
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      require: "Email address is required",
      validate: [isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: "Password is required",
    },
    admin: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
