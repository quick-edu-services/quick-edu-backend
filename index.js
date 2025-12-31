import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import loadRoutes from "./routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger-output.json", "utf-8"));

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

loadRoutes(app);
app.use(errorMiddleware);

// Connect to DB and start server
const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`Swagger Docs available at http://localhost:${process.env.PORT}/api-docs`);
  });
};

startServer();
