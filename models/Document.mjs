import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true }, // e.g. "National ID Card"
    type: {
      type: String,
      enum: ["nic", "birth_certificate", "passport", "other"],
      default: "other",
    },
    uploadedAt: { type: Date, required: true, default: Date.now },
    fileUrl: { type: String, default: "" }, // optional
    status: { type: String, enum: ["ok", "missing"], default: "ok" },
  },
  { timestamps: true }
);

export default mongoose.models.Document || mongoose.model("Document", documentSchema);
