import express from "express";
import booksControllers from "../controllers/booksControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createBookSchema, markAsBorrowedSchema } from "../schemas/bookSchemas.js";
import { isValidIsbn } from "../middlewares/isValidIsbn.js";

export const bookRouter = express.Router();

bookRouter.get("/", booksControllers.getAllBooks);
bookRouter.post("/", validateBody(createBookSchema), booksControllers.createBook);
bookRouter.put("/:isbn", isValidIsbn, validateBody(createBookSchema), booksControllers.updateBook);
bookRouter.delete("/:isbn", isValidIsbn, booksControllers.deleteBook);
bookRouter.patch(
  "/:isbn/borrow",
  isValidIsbn,
  validateBody(markAsBorrowedSchema),
  booksControllers.updateBook
);
