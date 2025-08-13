import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from 'cookie-parser';
import databaseConnection from "./config/database.mjs";
import authRouter from "./routes/auth.mjs";
import documentsRouter from "./routes/documents.mjs";

const app = express();
const PORT = process.env.PORT || "8080";
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use("/auth", authRouter);
app.use("/documents", documentsRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
    databaseConnection();
})

export default app;
