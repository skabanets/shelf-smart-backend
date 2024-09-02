import express from "express";
import booksControllers from "../controllers/booksControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createBookSchema } from "../schemas/bookSchemas.js";

export const bookRouter = express.Router();

bookRouter.post("/", validateBody(createBookSchema), booksControllers.createBook);
