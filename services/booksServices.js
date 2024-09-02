import { Book } from "../models/Book.js";

export const fetchBooks = async ({ skip, limit, query }) => {
  const searchCondition = query
    ? {
        $or: [
          { isbn: { $regex: query, $options: "i" } },
          { title: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  let booksQuery = Book.find(searchCondition, "isbn title author isBorrowed")
    .skip(skip)
    .limit(limit);

  const totalBooks = await Book.countDocuments(searchCondition);
  const totalPages = Math.ceil(totalBooks / limit);

  const books = await booksQuery.exec();

  return { books, totalPages };
};

export const addBook = async data => {
  const newBook = await Book.create(data);
  return newBook;
};
