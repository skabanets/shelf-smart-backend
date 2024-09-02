import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";

const { PORT = 3000, DB_URL } = process.env;

export const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
