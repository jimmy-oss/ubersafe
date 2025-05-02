import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
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
  isDriver: {
    type: Boolean,
    default: false,
  },
  profilePic: {
  type: String,
  default: 'https://www.gravatar.com/avatar/default?s=200'
}
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
