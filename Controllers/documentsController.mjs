import Document from "../models/Document.mjs";
import DocumentRequest from "../models/DocumentRequest.mjs";
import jwt from "jsonwebtoken";

// GET /documents
export const listDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.userId }).sort({ uploadedAt: -1 });
    res.json({ docs });
  } catch (e) {
    console.error("List documents error:", e);
    res.status(500).json({ message: "Failed to load documents" });
  }
};

// POST /documents/request { docIds: string[], delivery: "post"|"collect" }
export const requestDocuments = async (req, res) => {
  try {
    const { docIds, delivery } = req.body;
    if (!Array.isArray(docIds) || docIds.length === 0)
      return res.status(400).json({ message: "No documents selected" });
    if (!["post", "collect"].includes(delivery))
      return res.status(400).json({ message: "Invalid delivery method" });

    const reqDoc = await DocumentRequest.create({
      user: req.userId,
      docIds,
      delivery,
    });

    res.status(201).json({ ok: true, requestId: reqDoc._id });
  } catch (e) {
    console.error("Request documents error:", e);
    res.status(500).json({ message: "Failed to submit request" });
  }
};

function getUserIdFromReq(req) {
  if (req.userId) return req.userId;

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.id || null;
  } catch {
    return null;
  }
}

// GET /documents  -> returns { documents: [...] }
export const getUserDocuments = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    console.log("user di " + userId);
    const documents = await Document.find({ user: userId })
      .sort({ uploadedAt: -1 });

    return res.json({ documents });
  } catch (err) {
    console.error("Error fetching documents:", err);
    return res.status(500).json({ message: "Failed to fetch documents" });
  }
};