import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from 'cookie-parser';
import databaseConnection from "./config/database.mjs";
import RoverRoutes from "./routes/RoverRoutes.mjs";
import AGVHistoryRoutes from "./routes/AGVHistoryRoutes.mjs";
import StatusRoutes from "./routes/StatusRoutes.mjs";

const app = express();
const PORT = process.env.PORT || "8080";
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use("/rovers", RoverRoutes);
app.use("/AGV", AGVHistoryRoutes );
app.use("/status", StatusRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
    databaseConnection();
})

export default app;
