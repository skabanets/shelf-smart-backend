import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { addBook, fetchBooks, updateBookByIsbn } from "../services/booksServices.js";

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

const updateBook = async (req, res) => {
  const { isbn } = req.params;

  const result = await updateBookByIsbn({ isbn }, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAllBooks: ctrlWrapper(getAllBooks),
  createBook: ctrlWrapper(createBook),
  updateBook: ctrlWrapper(updateBook),
};
