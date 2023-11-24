import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: String,
  email: String,
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
