import mongoose from "mongoose";

const documentRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    docIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document", required: true }],
    delivery: { type: String, enum: ["post", "collect"], required: true },
    status: { type: String, enum: ["pending", "processing", "ready", "shipped", "completed"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.models.DocumentRequest || mongoose.model("DocumentRequest", documentRequestSchema);
