import { ctrlWrapper } from "../helpers/ctrlWrapper";
import { addBook } from "../services/booksServices";

const createBook = async (req, res) => {
  const result = await addBook({ ...req.body });

  res.status(201).json(result);
};

export default {
  createBook: ctrlWrapper(createBook),
};
