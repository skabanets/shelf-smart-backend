import express from "express";
import booksControllers from "../controllers/booksControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createBookSchema } from "../schemas/bookSchemas.js";
import { isValidIsbn } from "../middlewares/isValidIsbn.js";

export const bookRouter = express.Router();

bookRouter.get("/", booksControllers.getAllBooks);
bookRouter.post("/", validateBody(createBookSchema), booksControllers.createBook);
bookRouter.put("/:isbn", isValidIsbn, validateBody(createBookSchema), booksControllers.updateBook);
