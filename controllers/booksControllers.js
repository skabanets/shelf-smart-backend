import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { addBook, fetchBooks } from "../services/booksServices.js";

const getAllBooks = async (req, res) => {
  const { page = 1, limit = 10, query = "" } = req.query;
  const skip = (page - 1) * limit;

  const { books, totalPages } = await fetchBooks({ skip, limit, query });

  res.json({ books, totalPages });
};

const createBook = async (req, res) => {
  const result = await addBook({ ...req.body });

  res.status(201).json(result);
};

export default {
  getAllBooks: ctrlWrapper(getAllBooks),
  createBook: ctrlWrapper(createBook),
};
