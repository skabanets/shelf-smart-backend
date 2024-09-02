import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  addBook,
  fetchBooks,
  removeBookByIsbn,
  updateBookByIsbn,
} from "../services/booksServices.js";

const getAllBooks = async (req, res) => {
  const { query = "" } = req.query;

  const result = await fetchBooks({ query });

  res.json(result);
};

const createBook = async (req, res) => {
  const { isbn } = req.body;
  const { books } = await fetchBooks({ isbn });

  if (books.length) {
    throw HttpError(
      409,
      "A book with the ISBN you have entered already exists in the database. Please check the ISBN number and try again."
    );
  }

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

const deleteBook = async (req, res) => {
  const { isbn } = req.params;

  const result = await removeBookByIsbn({ isbn });

  if (!result) {
    throw HttpError(404);
  }

  res.status(204).json();
};

export default {
  getAllBooks: ctrlWrapper(getAllBooks),
  createBook: ctrlWrapper(createBook),
  updateBook: ctrlWrapper(updateBook),
  deleteBook: ctrlWrapper(deleteBook),
};
