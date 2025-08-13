// models/User.mjs
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nic: { type: String, required: true, trim: true, unique: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true },

    dob: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },

    nicVerified: { type: Boolean, default: false },
    birthCertificateVerified: { type: Boolean, default: false },
    priorityWindowVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Instance methods
userSchema.methods.setPassword = async function (pw) {
  this.passwordHash = await bcrypt.hash(pw, 10);
};

userSchema.methods.validatePassword = async function (pw) {
  return bcrypt.compare(pw, this.passwordHash);
};

// Hide sensitive fields when sending to client
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

// Optional: normalize inputs
userSchema.pre("save", function (next) {
  if (this.isModified("nic") && typeof this.nic === "string") {
    this.nic = this.nic.trim();
  }
  if (this.isModified("email") && typeof this.email === "string") {
    this.email = this.email.trim().toLowerCase();
  }
  next();
});

// Reuse model in dev hot-reloads
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
