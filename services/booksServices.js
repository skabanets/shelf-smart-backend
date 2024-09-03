import { HttpError } from "../helpers/HttpError.js";
import { Book } from "../models/Book.js";

export const fetchBooks = async ({ query }) => {
  const searchCondition = query
    ? {
        $or: [
          { isbn: { $regex: query, $options: "i" } },
          { title: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const books = await Book.find(searchCondition, "isbn title author isBorrowed").exec();
  return books;
};

export const fetchBookByIsbn = async isbn => {
  const book = await Book.find(isbn).exec();
  return book;
};

export const addBook = async data => {
  const newBook = await Book.create(data);
  return newBook;
};

export const updateBookByIsbn = async (isbn, data) => {
  try {
    const updatedContact = await Book.findOneAndUpdate(isbn, data, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    throw HttpError(
      409,
      "Book with the ISBN you have entered already exists in the database. Please check the ISBN number and try again."
    );
  }
};

export const removeBookByIsbn = async ({ isbn }) => {
  const removedBook = await Book.findOneAndDelete({ isbn });
  return removedBook;
};
