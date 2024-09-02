import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { addBook } from "../services/booksServices.js";

const createBook = async (req, res) => {
  const result = await addBook({ ...req.body });

  res.status(201).json(result);
};

export default {
  createBook: ctrlWrapper(createBook),
};
