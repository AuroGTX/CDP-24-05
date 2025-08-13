import { Router } from "express";
import { listDocuments, requestDocuments, getUserDocuments } from "../controllers/documentsController.mjs";
import requireAuth from "../middleware/auth.mjs";

const router = Router();

router.get("/", requireAuth, listDocuments);
router.post("/request", requireAuth, requestDocuments);
router.get("/my-documents", requireAuth, getUserDocuments);

export default router;
